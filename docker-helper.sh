#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to display usage
show_usage() {
    echo -e "${BLUE}Usage:${NC}"
    echo "  ./docker-helper.sh [command]"
    echo ""
    echo -e "${BLUE}Commands:${NC}"
    echo "  build    - Build the Docker image"
    echo "  start    - Start the application"
    echo "  stop     - Stop the application"
    echo "  restart  - Restart the application"
    echo "  logs     - View application logs"
    echo "  clean    - Remove containers and images"
}

# Check if command is provided
if [ $# -eq 0 ]; then
    show_usage
    exit 1
fi

# Execute command
case "$1" in
    "build")
        echo -e "${GREEN}Building Docker image...${NC}"
        docker-compose build
        ;;
    "start")
        echo -e "${GREEN}Starting application...${NC}"
        docker-compose up -d
        ;;
    "stop")
        echo -e "${GREEN}Stopping application...${NC}"
        docker-compose down
        ;;
    "restart")
        echo -e "${GREEN}Restarting application...${NC}"
        docker-compose restart
        ;;
    "logs")
        echo -e "${GREEN}Showing application logs...${NC}"
        docker-compose logs -f
        ;;
    "clean")
        echo -e "${GREEN}Cleaning up Docker resources...${NC}"
        docker-compose down --rmi all --volumes
        ;;
    *)
        echo -e "${BLUE}Invalid command${NC}"
        show_usage
        exit 1
        ;;
esac