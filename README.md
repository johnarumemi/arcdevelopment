# Arc Development

Learning how to use Material UI React UI framework as part of a [course][1] while 
implementing several customisations and changes of my own along the way.

## Table of Contents
+ [Description](#description)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [Docker](#docker)
+ [Features](#features)
+ [Status](#status)
+ [Source](#source)
+ [Notes](#notes)

## Description
This course and project covers using Material-UI for creating a web app from scratch and 
eventually migrating it to Next JS for better SEO.

## Technologies
+ React 17 & TypeScript
+ React-Router-Dom
+ Material-UI & Material-UI Icons
+ Docker + NGINX as a Webserver
+ Axios
+ react-lottie (consider using lottie-react instead, more recently updated)

## Setup
To run this project, install it locally using npm and start the dev server:

```shell
# Clone this repository
$ git clone https://github.com/amitmerchant1990/pomolectron.git

# Go into directory
$ cd arcdevelopment

# install packages
$ npm install   

# launch dev server
$ npm start    
```
<br />


## Docker
Currently, the NGINX web server in the docker image uses port 80.

A Docker image can built via:
```shell
$ docker image build -f ./Dockerfile -t arcdevelopment:tag 
```

A container can then be built via
```bash
$ docker container run -d --name CONTAINER_NAME --port LOCAL_PORT:80 arcdevelopment
```

## Features
Current Functionality:

To-do features:
+ use pm2 in Docker image and change NGINX to reverse proxy
+ remove dependence on react-lottie (last updated 2018) and use 
  lottie-react instead (last updated 2020)
  
## Status
Project is: __in progress__

## Source
+ [Implement High Fidelity Designs with Material-UI and ReactJS][1]

+ Useful information on how to extend types in Material-UI:
  1. <https://javascript.plainenglish.io/extend-material-ui-theme-in-typescript-a462e207131f>
  2. <https://www.bergqvist.it/blog/2020/6/26/extending-theme-material-ui-with-typescript>
  
## Notes
1) Material-UI does not perfectly support javascript strict-mode, hence removed below strict mode jsx elements

```jsx
<React.StrictMode>
    ...
</React.StrictMode>
```

2) Useful piece of code:

`Omit<T, R>` will remove member in T that exist in R
`Modify<T, R> = Omit<T, R> & R` removes R from T and then merges R back

```typescript
type Modify<T, R> = Omit<T, keyof R> & R;
```

[1]: https://www.udemy.com/course/implement-high-fidelity-designs-with-material-ui-and-reactjs/ "Implement High Fidelity Designs with Material-UI and ReactJS"
