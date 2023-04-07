FROM node:16.15.1-stretch-slim as frontend
COPY ./electricity_board_frontend /opt/electricity_board_frontend
WORKDIR /opt/electricity_board_frontend
RUN npm install
RUN REACT_APP_BACKEND_URL=${BACKEND_URL} npm run build

# official base python image
FROM python:3.10.5-bullseye

# working directory 
WORKDIR /usr/src/app

# environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

# system dependencies 
RUN apt-get update && apt-get install -y netcat

# app dependencies
RUN pip install --upgrade pip
COPY ./web/requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt
# RUN mkdir web/electricity_board

COPY ./web /usr/src/app/web
COPY --from=frontend /opt/electricity_board_frontend/build/index.html /usr/src/app/web/electricity_board/templates/
COPY --from=frontend /opt/electricity_board_frontend/build/static/ /usr/src/app/web/electricity_board/static/
COPY ./web/enterypoint.sh ./entrypoint.sh
WORKDIR /usr/src/app/web

# entrypoint bash script
ENTRYPOINT ["./enterypoint.sh"]