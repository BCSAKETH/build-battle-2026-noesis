try:
    from .server import app
except (ImportError, ValueError):
    from server import app

# Vercel FastAPI convention entrypoint
__all__ = ["app"]
