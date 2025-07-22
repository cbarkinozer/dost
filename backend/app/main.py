from fastapi import FastAPI

app = FastAPI(title="Dost Backend")


@app.get("/", tags=["Root"])
async def read_root():
    return {"success": True}