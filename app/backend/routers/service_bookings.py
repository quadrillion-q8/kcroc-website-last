import json
import logging
from typing import List, Optional


from fastapi import APIRouter, Body, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from services.service_bookings import Service_bookingsService

# Set up logging
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/entities/service_bookings", tags=["service_bookings"])


# ---------- Pydantic Schemas ----------
class Service_bookingsData(BaseModel):
    """Entity data schema (for create/update)"""
    customer_name: str
    customer_phone: str
    customer_email: str = None
    device_type: str
    issue_description: str
    pickup_date: str
    pickup_time_slot: str
    status: str
    created_at: str


class Service_bookingsUpdateData(BaseModel):
    """Update entity data (partial updates allowed)"""
    customer_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_email: Optional[str] = None
    device_type: Optional[str] = None
    issue_description: Optional[str] = None
    pickup_date: Optional[str] = None
    pickup_time_slot: Optional[str] = None
    status: Optional[str] = None
    created_at: Optional[str] = None


class Service_bookingsResponse(BaseModel):
    """Entity response schema"""
    id: int
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    device_type: str
    issue_description: str
    pickup_date: str
    pickup_time_slot: str
    status: str
    created_at: str

    class Config:
        from_attributes = True


class Service_bookingsListResponse(BaseModel):
    """List response schema"""
    items: List[Service_bookingsResponse]
    total: int
    skip: int
    limit: int


class Service_bookingsBatchCreateRequest(BaseModel):
    """Batch create request"""
    items: List[Service_bookingsData]


class Service_bookingsBatchUpdateItem(BaseModel):
    """Batch update item"""
    id: int
    updates: Service_bookingsUpdateData


class Service_bookingsBatchUpdateRequest(BaseModel):
    """Batch update request"""
    items: List[Service_bookingsBatchUpdateItem]


class Service_bookingsBatchDeleteRequest(BaseModel):
    """Batch delete request"""
    ids: List[int]


# ---------- Routes ----------
@router.get("", response_model=Service_bookingsListResponse)
async def query_service_bookingss(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    """Query service_bookingss with filtering, sorting, and pagination"""
    logger.debug(f"Querying service_bookingss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")
    
    service = Service_bookingsService(db)
    try:
        # Parse query JSON if provided
        query_dict = None
        if query:
            try:
                query_dict = json.loads(query)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Invalid query JSON format")
        
        result = await service.get_list(
            skip=skip, 
            limit=limit,
            query_dict=query_dict,
            sort=sort,
        )
        logger.debug(f"Found {result['total']} service_bookingss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying service_bookingss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/all", response_model=Service_bookingsListResponse)
async def query_service_bookingss_all(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    # Query service_bookingss with filtering, sorting, and pagination without user limitation
    logger.debug(f"Querying service_bookingss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")

    service = Service_bookingsService(db)
    try:
        # Parse query JSON if provided
        query_dict = None
        if query:
            try:
                query_dict = json.loads(query)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Invalid query JSON format")

        result = await service.get_list(
            skip=skip,
            limit=limit,
            query_dict=query_dict,
            sort=sort
        )
        logger.debug(f"Found {result['total']} service_bookingss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying service_bookingss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/{id}", response_model=Service_bookingsResponse)
async def get_service_bookings(
    id: int,
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    """Get a single service_bookings by ID"""
    logger.debug(f"Fetching service_bookings with id: {id}, fields={fields}")
    
    service = Service_bookingsService(db)
    try:
        result = await service.get_by_id(id)
        if not result:
            logger.warning(f"Service_bookings with id {id} not found")
            raise HTTPException(status_code=404, detail="Service_bookings not found")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching service_bookings {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("", response_model=Service_bookingsResponse, status_code=201)
async def create_service_bookings(
    data: Service_bookingsData,
    db: AsyncSession = Depends(get_db),
):
    """Create a new service_bookings"""
    logger.debug(f"Creating new service_bookings with data: {data}")
    
    service = Service_bookingsService(db)
    try:
        result = await service.create(data.model_dump())
        if not result:
            raise HTTPException(status_code=400, detail="Failed to create service_bookings")
        
        logger.info(f"Service_bookings created successfully with id: {result.id}")
        return result
    except ValueError as e:
        logger.error(f"Validation error creating service_bookings: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating service_bookings: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/batch", response_model=List[Service_bookingsResponse], status_code=201)
async def create_service_bookingss_batch(
    request: Service_bookingsBatchCreateRequest,
    db: AsyncSession = Depends(get_db),
):
    """Create multiple service_bookingss in a single request"""
    logger.debug(f"Batch creating {len(request.items)} service_bookingss")
    
    service = Service_bookingsService(db)
    results = []
    
    try:
        for item_data in request.items:
            result = await service.create(item_data.model_dump())
            if result:
                results.append(result)
        
        logger.info(f"Batch created {len(results)} service_bookingss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch create: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch create failed: {str(e)}")


@router.put("/batch", response_model=List[Service_bookingsResponse])
async def update_service_bookingss_batch(
    request: Service_bookingsBatchUpdateRequest,
    db: AsyncSession = Depends(get_db),
):
    """Update multiple service_bookingss in a single request"""
    logger.debug(f"Batch updating {len(request.items)} service_bookingss")
    
    service = Service_bookingsService(db)
    results = []
    
    try:
        for item in request.items:
            # Only include non-None values for partial updates
            update_dict = {k: v for k, v in item.updates.model_dump().items() if v is not None}
            result = await service.update(item.id, update_dict)
            if result:
                results.append(result)
        
        logger.info(f"Batch updated {len(results)} service_bookingss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch update: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch update failed: {str(e)}")


@router.put("/{id}", response_model=Service_bookingsResponse)
async def update_service_bookings(
    id: int,
    data: Service_bookingsUpdateData,
    db: AsyncSession = Depends(get_db),
):
    """Update an existing service_bookings"""
    logger.debug(f"Updating service_bookings {id} with data: {data}")

    service = Service_bookingsService(db)
    try:
        # Only include non-None values for partial updates
        update_dict = {k: v for k, v in data.model_dump().items() if v is not None}
        result = await service.update(id, update_dict)
        if not result:
            logger.warning(f"Service_bookings with id {id} not found for update")
            raise HTTPException(status_code=404, detail="Service_bookings not found")
        
        logger.info(f"Service_bookings {id} updated successfully")
        return result
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error updating service_bookings {id}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error updating service_bookings {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.delete("/batch")
async def delete_service_bookingss_batch(
    request: Service_bookingsBatchDeleteRequest,
    db: AsyncSession = Depends(get_db),
):
    """Delete multiple service_bookingss by their IDs"""
    logger.debug(f"Batch deleting {len(request.ids)} service_bookingss")
    
    service = Service_bookingsService(db)
    deleted_count = 0
    
    try:
        for item_id in request.ids:
            success = await service.delete(item_id)
            if success:
                deleted_count += 1
        
        logger.info(f"Batch deleted {deleted_count} service_bookingss successfully")
        return {"message": f"Successfully deleted {deleted_count} service_bookingss", "deleted_count": deleted_count}
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch delete: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch delete failed: {str(e)}")


@router.delete("/{id}")
async def delete_service_bookings(
    id: int,
    db: AsyncSession = Depends(get_db),
):
    """Delete a single service_bookings by ID"""
    logger.debug(f"Deleting service_bookings with id: {id}")
    
    service = Service_bookingsService(db)
    try:
        success = await service.delete(id)
        if not success:
            logger.warning(f"Service_bookings with id {id} not found for deletion")
            raise HTTPException(status_code=404, detail="Service_bookings not found")
        
        logger.info(f"Service_bookings {id} deleted successfully")
        return {"message": "Service_bookings deleted successfully", "id": id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting service_bookings {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")