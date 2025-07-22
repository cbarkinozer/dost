from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # --- Database Settings ---
    DOST_POSTGRES_USER: str
    DOST_POSTGRES_PASSWORD: str
    DOST_POSTGRES_DB: str
    DOST_POSTGRES_HOST: str = 'localhost'
    DOST_POSTGRES_PORT: int = 5432

    # --- LLM Provider Settings ---
    # Generic OpenAI-compatible
    LLM_API_BASE_URL: str
    LLM_API_KEY: Optional[str] = None

    # Groq
    GROQ_API_KEY: Optional[str] = None


    model_config = SettingsConfigDict(env_file=".env", extra='ignore')

    @property
    def DATABASE_URL(self) -> str:
        """
        Dynamically construct the database URL from the component parts.
        This is what the application and Alembic will use to connect.
        """
        return (
            f"postgresql://{self.DOST_POSTGRES_USER}:{self.DOST_POSTGRES_PASSWORD}"
            f"@{self.DOST_POSTGRES_HOST}:{self.DOST_POSTGRES_PORT}/{self.DOST_POSTGRES_DB}"
        )

# Create a single, globally accessible settings instance
settings = Settings()