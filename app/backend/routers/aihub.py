"""
AI Hub router module.
Provides Generate Text (gentxt) and Generate Image (genimg) API endpoints.
"""

import ast
import json
import logging
from typing import Any

from fastapi import APIRouter, HTTPException, status, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from schemas.aihub import GenImgRequest, GenImgResponse, GenTxtRequest
from services.aihub import AIHubService, InvalidImageInputError
from sse_starlette.sse import EventSourceResponse

# 🔒 Initialize Limiter
limiter = Limiter(key_func=get_remote_address)

logger = logging.getLogger(__name__)

def _try_extract_message_from_dict(data: dict) -> str | None:
    """Try to extract message field from a dictionary."""
    if "error" in data and isinstance(data["error"], dict):
        if "message" in data["error"]:
            return data["error"]["message"]
    if "message" in data:
        return data["message"]
    return None

def _try_parse_dict(s: str) -> dict | None:
    """Try to parse a string as a dictionary."""
    try:
        data = json.loads(s)
        if isinstance(data, dict):
            return data
    except (json.JSONDecodeError, TypeError):
        pass
    try:
        data = ast.literal_eval(s)
        if isinstance(data, dict):
            return data
    except (ValueError, SyntaxError, TypeError):
        pass
    return None

def extract_error_message(error: Any) -> str:
    """Extract a readable error message."""
    error_str = str(error)
    error_data = _try_parse_dict(error_str)
    if error_data:
        message = _try_extract_message_from_dict(error_data)
        if message:
            return message
    start_idx = error_str.find("{")
    end_idx = error_str.rfind("}")
    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
        dict_str = error_str[start_idx : end_idx + 1]
        error_data = _try_parse_dict(dict_str)
        if error_data:
            message = _try_extract_message_from_dict(error_data)
            if message:
                return message
    return error_str

router = APIRouter(prefix="/api/v1/aihub", tags=["aihub"])

@router.post("/gentxt")
@limiter.limit("5/minute")  # 🔒 Rate limited to prevent budget exhaustion
async def generate_text(
    request: Request, # Required for SlowAPI
    data: GenTxtRequest,
):
    """Generate Text endpoint with rate limiting."""
    try:
        service = AIHubService()
        if data.stream:
            async def event_generator():
                try:
                    async for content in service.gentxt_stream(data):
                        yield json.dumps({"content": content})
                except Exception as e:
                    logger.error(f"Stream error: {e}")
                    yield json.dumps({"content": f"[ERROR] {extract_error_message(e)}"})
                finally:
                    yield "[DONE]"
            return EventSourceResponse(event_generator(), media_type="text/event-stream")
        else:
            return await service.gentxt(data)

    except ValueError as e:
        logger.error(f"AI service configuration error: {e}")
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=extract_error_message(e))
    except Exception as e:
        logger.error(f"Text generation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=extract_error_message(e),
        )

@router.post("/genimg", response_model=GenImgResponse)
@limiter.limit("2/minute")  # 🔒 Strict rate limit for expensive image generation
async def generate_image(
    request: Request, # Required for SlowAPI
    data: GenImgRequest,
):
    """Text-to-Image / Image-to-Image endpoint with strict rate limiting."""
    try:
        service = AIHubService()
        return await service.genimg(data)

    except InvalidImageInputError as e:
        logger.warning(f"Invalid image input: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except ValueError as e:
        logger.error(f"AI service configuration error: {e}")
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=extract_error_message(e))
    except Exception as e:
        logger.error(f"Image generation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=extract_error_message(e),
        )
