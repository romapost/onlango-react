#/bin/bash

SERVICE=api

install() {
  run() {
    docker-compose run --no-deps $SERVICE npm install "$@"
  }

  shift
  case "$1" in
    ""|"-p"|"--prod"|"--production")
      run --production
      ;;
    "dev")
      run
      ;;
    *)
      run "$@"
      ;;
  esac

}

case "$1" in
  "install")
    install "$@"
    ;;
  "up")
    docker-compose up
    ;;
  "")
    docker-compose up -d
    ;;
  "dev")
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
    ;;
  "exec")
    shift
    docker-compose exec $SERVICE "$@"
    ;;
  *)
    "Wrong argument"
    exit 1
    ;;
esac
