#!/bin/bash

pushd $(dirname $0) > /dev/null

case "$1" in
    dev)
        echo "Starting development servers..."
        # Run PHP server in background
        php -S localhost:3001 -t site/public &
        PHP_PID=$!
        
        # Ensure PHP server is killed even if npm dev is interrupted
        trap "kill $PHP_PID 2>/dev/null" EXIT
        
        # Run npm dev
        (cd site && npm run dev)
        ;;
    build)
        echo "Building site..."
        (cd site && npm run build)
        ;;
    preview)
        echo "Starting preview server at http://localhost:8080"
        php -S localhost:8080 -t home/html
        ;;
    *)
        if [ -d "python-venv" ]; then
            . python-venv/bin/activate
        fi
        python3 ./sync.py "$@"
        ;;
esac

popd > /dev/null
