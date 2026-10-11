import os
import sys

# Ensure root and backend directory are on sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

BACKEND_DIR = os.path.join(BASE_DIR, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

try:
    from backend.server import app
except ImportError:
    from server import app

# Vercel Serverless entrypoint
# The ASGI application 'app' is natively served by @vercel/python
__all__ = ["app"]
