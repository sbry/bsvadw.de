[BSVAdw-Site](https://www.bsvadw.de)
========================================

~~~sh
##
# build the site
cd site
##
# install NPM
npm install
##
# update NPM
npm update
##
# open development server
npm run dev
##
# build site in ../html
npm run build
##
#
cd .. 
##
# Environment-Variable FTPS_URL must be set (this is special)
export FTPS_URL=ftps://user:pass@host:port
export HEIMSPIELE_HALLE1="https://"
export TERMINE_HALLE2="https://"

##
# sync.py für Aktualisierungen:
 Usage: 
 ./sync.py push|push_ics|pull_ics


~~~


This is a starter template for [Learn Next.js](https://nextjs.org/learn).
=======
# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
