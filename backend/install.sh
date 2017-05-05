#!/bin/bash

# flask already installed
# bokeh already installed
conda install -c anaconda redis=3.2.0
conda install -c conda-forge nodejs=6.10.2
pip install 'celery[redis]'
pip install httpie
pip install flask-cors
