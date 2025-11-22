#!/bin/bash

# Database copy and truncate script
# Copies all tables from source database to destination database, truncating destination first
# Usage: ./copy-db.sh SOURCE_DB DEST_DB [MYSQL_HOST] [MYSQL_USER] [MYSQL_PASSWORD]

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validate arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Error: Insufficient arguments${NC}"
    echo "Usage: $0 MYSQL_USER MYSQL_PASSWORD"
    echo ""
    echo "Arguments:"
    echo "  MYSQL_USER      - MySQL user"
    echo "  MYSQL_PASSWORD  - MySQL password"
    echo ""
    echo "Example:"
    echo "  $0 user password"
    exit 1
fi

SOURCE_DB="soc_prod"
DEST_DB="soc_dev"
MYSQL_HOST="maridb"

MYSQL_USER="${1}"
MYSQL_PASSWORD="${2}"

# Build mysql connection string
MYSQL_CMD="mysql -h $MYSQL_HOST -u $MYSQL_USER"
if [ -n "$MYSQL_PASSWORD" ]; then
    MYSQL_CMD="$MYSQL_CMD -p$MYSQL_PASSWORD"
fi

echo -e "${YELLOW}Starting database copy process...${NC}"
echo "Source Database: $SOURCE_DB"
echo "Destination Database: $DEST_DB"
echo "MySQL Host: $MYSQL_HOST"
echo "MySQL User: $MYSQL_USER"
echo ""

# Verify source database exists
echo -e "${YELLOW}Verifying source database exists...${NC}"
if ! $MYSQL_CMD -e "USE $SOURCE_DB;" 2>/dev/null; then
    echo -e "${RED}Error: Source database '$SOURCE_DB' not found or connection failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Source database verified${NC}"

# Verify destination database exists
echo -e "${YELLOW}Verifying destination database exists...${NC}"
if ! $MYSQL_CMD -e "USE $DEST_DB;" 2>/dev/null; then
    echo -e "${RED}Error: Destination database '$DEST_DB' not found or connection failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Destination database verified${NC}"

# Get list of tables in destination database
echo -e "${YELLOW}Truncating all tables in destination database...${NC}"
TABLES=$($MYSQL_CMD -N -e "SELECT GROUP_CONCAT(TABLE_NAME) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='$DEST_DB';" 2>/dev/null)

if [ -z "$TABLES" ]; then
    echo -e "${YELLOW}No tables found in destination database${NC}"
else
    # Disable foreign key checks, truncate, then re-enable
    $MYSQL_CMD -e "USE $DEST_DB; SET FOREIGN_KEY_CHECKS = 0;" 2>/dev/null
    
    IFS=',' read -ra TABLE_ARRAY <<< "$TABLES"
    for table in "${TABLE_ARRAY[@]}"; do
        table=$(echo "$table" | xargs) # Trim whitespace
        echo "  Truncating: $table"
        $MYSQL_CMD -e "USE $DEST_DB; TRUNCATE TABLE \`$table\`;" 2>/dev/null || echo -e "${YELLOW}  Warning: Could not truncate $table${NC}"
    done
    
    $MYSQL_CMD -e "USE $DEST_DB; SET FOREIGN_KEY_CHECKS = 1;" 2>/dev/null
fi
echo -e "${GREEN}✓ Truncation complete${NC}"

# Get list of tables in source database
echo -e "${YELLOW}Getting table list from source database...${NC}"
SOURCE_TABLES=$($MYSQL_CMD -N -e "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='$SOURCE_DB' ORDER BY TABLE_NAME;" 2>/dev/null)

if [ -z "$SOURCE_TABLES" ]; then
    echo -e "${YELLOW}No tables found in source database${NC}"
    exit 0
fi

TABLE_COUNT=$(echo "$SOURCE_TABLES" | wc -l)
echo -e "${GREEN}✓ Found $TABLE_COUNT tables to copy${NC}"
echo ""

# Disable foreign key checks for destination
$MYSQL_CMD -e "USE $DEST_DB; SET FOREIGN_KEY_CHECKS = 0;" 2>/dev/null

# Copy each table
COUNTER=0
while IFS= read -r table; do
    table=$(echo "$table" | xargs) # Trim whitespace
    COUNTER=$((COUNTER + 1))
    
    echo -e "${YELLOW}[$COUNTER/$TABLE_COUNT]${NC} Copying table: $table"
    
    # Copy table structure and data using INSERT INTO ... SELECT
    $MYSQL_CMD -e "INSERT INTO $DEST_DB.\`$table\` SELECT * FROM $SOURCE_DB.\`$table\`;" 2>/dev/null || {
        echo -e "${RED}  Error copying table $table${NC}"
        continue
    }
    
    # Get row count
    ROW_COUNT=$($MYSQL_CMD -N -e "SELECT COUNT(*) FROM $DEST_DB.\`$table\`;" 2>/dev/null)
    echo -e "${GREEN}  ✓ Copied $ROW_COUNT rows${NC}"
done <<< "$SOURCE_TABLES"

# Re-enable foreign key checks
$MYSQL_CMD -e "USE $DEST_DB; SET FOREIGN_KEY_CHECKS = 1;" 2>/dev/null

echo ""
echo -e "${GREEN}✓ Database copy completed successfully!${NC}"
echo "All tables from '$SOURCE_DB' have been copied to '$DEST_DB'"
