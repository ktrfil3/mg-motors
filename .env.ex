# ─── Copie de .env.example ────────────────────────────────────────────────────
# Este arquivo é criado automaticamente via: cp .env.example .env

DATABASE_URL="postgresql://troller:troller_dev@localhost:5432/troller_db"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="dev_jwt_secret_change_in_production_!!!"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="dev_jwt_refresh_secret_change_in_production_!!!"
JWT_REFRESH_EXPIRES_IN="7d"
ENCRYPTION_KEY="dev_enc_key_32bytes_placeholder_!!"
ENCRYPTION_IV="dev_enc_iv_16byte"
API_PORT=3001
API_PREFIX="api/v1"
NODE_ENV=development
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
BUREAU_PROVIDER=mock
