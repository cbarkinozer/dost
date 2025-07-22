from fastapi import FastAPI
import uvicorn

app = FastAPI(title="Dost Backend")


@app.get("/", tags=["Root"])
async def read_root():
    return {"success": True}


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)