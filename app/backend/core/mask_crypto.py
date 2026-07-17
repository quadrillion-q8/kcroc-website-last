# File: core/mask_crypto.py
# Used to conceal LLM access
import base64
import hashlib
import os

from cryptography.fernet import Fernet

key_prefix = "mgxkey-"


def _derive_fernet_key(key_material: str) -> bytes:
    """Derive a valid Fernet key from arbitrary string using SHA-256 and urlsafe base64."""
    digest = hashlib.sha256(key_material.encode("utf-8")).digest()  # 32 bytes
    return base64.urlsafe_b64encode(digest)


def _get_fernet(key_str: str) -> Fernet:
    key = _derive_fernet_key(key_str)
    return Fernet(key)


def _get_secure_key() -> str:
    """
    🔒 SECURED: Fetch the MASK_KEY environment variable. 
    Never fallback to a hardcoded string. Halt execution if missing.
    """
    pwd = os.environ.get("MASK_KEY")
    if not pwd:
        raise RuntimeError(
            "CRITICAL SECURITY ERROR: MASK_KEY environment variable is missing. "
            "Halting execution to prevent insecure data encryption."
        )
    return pwd


def encrypt_text(plain: str) -> str:
    pwd = _get_secure_key()
    f = _get_fernet(pwd)
    return key_prefix + f.encrypt(plain.encode("utf-8")).decode("utf-8")


def decrypt_text(token: str) -> str:
    pwd = _get_secure_key()
    f = _get_fernet(pwd)
    token = token.removeprefix(key_prefix)
    return f.decrypt(token.encode("utf-8")).decode("utf-8")
