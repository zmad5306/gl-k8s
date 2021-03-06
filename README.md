# Grocery List with Docker and Kubernetes

Kubernetes manifests for grocery list application.

## Development Environment

### Install minikube & kubectl

https://kubernetes.io/docs/tasks/tools/install-minikube/

## Application Installation

### All

Issue from the root folder (do not cd into gl-k8s directory).

`kubectl apply -f gl-k8s -R`

### Configuration

`kubectl apply -f gl-config/configmap.yml`

### Mongodb Database

`kubectl apply -f gl-db/storageclass.yml`

`kubectl apply -f gl-db/statefulset.yml`

`kubectl apply -f gl-db/service.yml`

#### Check Replicia Set Status

Verify correct number of members:

`kubectl exec mongo-0 -- bin/bash -c '/usr/bin/mongo --eval="printjson(rs.status())"'`

`kubectl exec mongo-1 -- bin/bash -c '/usr/bin/mongo --eval="printjson(rs.status())"'`

#### Setup Data

Adds some test data to mongodb database for application testing.

`kubectl cp gl-db/setup-data.js mongo-0:/usr/local/setup-data.js -c mongo`

`kubectl exec mongo-0 -- bin/bash -c '/usr/bin/mongo /usr/local/setup-data.js'`

### Department Micro-service

`kubectl apply -f gl-dept/deployment.yml`

`kubectl apply -f gl-dept/service.yml`

### List Micro-service

`kubectl apply -f gl-list/deployment.yml`

`kubectl apply -f gl-list/service.yml`

### Item Micro-service

`kubectl apply -f gl-item/deployment.yml`

`kubectl apply -f gl-item/service.yml`

### API Gateway

`kubectl apply -f gl-api/deployment.yml`

`kubectl apply -f gl-api/service.yml`

### Web Application (UI)

`kubectl apply -f gl-ui/deployment.yml`

`kubectl apply -f gl-ui/service.yml`

### Ingress

`kubectl apply -f gl-ingress/ingress.yml`

#### DNS

Get minikube's ip by executing `minikube ip` in a command prompt running as admin. Edit host file `C:\Windows\System32\drivers\etc\hosts` add entry `<minikube ip> grocery-list`. This maps minikube's host ip to `grocery-list`. The ingress service is exposed on the `grocery-list` DNS entry.

The application then may be accessed by executing `http://grocery-list/` in the browser.

## Other Useful Commands

Ingress Status: `kubectl describe ingress --namespace default`

Env Vars from Pod: `kubectl exec gl-api-deployment-66f9457944-2qmmm env`

### Mongodb Database Clean Up

`kubectl delete statefulset mongo`

`kubectl delete svc mongo`

`kubectl delete pvc -l role=mongo`

### Initilize Replicia Set

**No longer required, adding rolebinding fixed this issue. Leaving this for documentation purposes.**

``` /bin/bash
kubectl exec -ti mongo-0 mongo

rs.initiate(
   {
      "_id": "rs0",
      "version": 1,
      "members": [
         { "_id": 0, "host" : "mongo-0.mongo:27017" },
         { "_id": 1, "host" : "mongo-1.mongo:27017" },
         { "_id": 2, "host" : "mongo-2.mongo:27017" }
      ]
   }
)
```

## Source and Image Repositories

| Repo Name                | Source                              | Docker Image                               |
| ------------------------ | ----------------------------------- | ------------------------------------------ |
| Department Micro-service | https://github.com/zmad5306/gl-dept | https://hub.docker.com/r/zmad5306/gl-dept/ |
| List Micro-service       | https://github.com/zmad5306/gl-list | https://hub.docker.com/r/zmad5306/gl-list/ |
| Item Micro-service       | https://github.com/zmad5306/gl-item | https://hub.docker.com/r/zmad5306/gl-item/ |
| API Gateway              | https://github.com/zmad5306/gl-api  | https://hub.docker.com/r/zmad5306/gl-api/  |
| Web Application (UI)     | https://github.com/zmad5306/gl-ui   | https://hub.docker.com/r/zmad5306/gl-ui/   |