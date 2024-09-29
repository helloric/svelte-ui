FROM ubuntu:22.04

RUN apt-get update && apt-get -y upgrade && apt-get install -y pip

RUN pip install mkdocs mkdocs-material mkdocstrings[python] mkdocs-glightbox