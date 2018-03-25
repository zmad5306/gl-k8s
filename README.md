# Grocery List with Docker and Kubernetes

Kubernetes manifests for grocery list application.

## Development Environment

### Install minikube & kubectl

https://kubernetes.io/docs/tasks/tools/install-minikube/

### Mongodb Database

`kubectl apply -f gl-db/mongo-statefulset.yaml`

### Department Micro-service

`kubectl apply -f gl-dept/deployment.yaml`

`kubectl apply -f gl-dept/service.yaml`

### List Micro-service

`kubectl apply -f gl-list/deployment.yaml`

`kubectl apply -f gl-list/service.yaml`

### Item Micro-service

`kubectl apply -f gl-item/deployment.yaml`

`kubectl apply -f gl-item/service.yaml`

### API Gateway

`kubectl apply -f gl-api/deployment.yaml`

`kubectl apply -f gl-api/service.yaml`

### Web Application (UI)

`kubectl apply -f gl-ui/deployment.yaml`

`kubectl apply -f gl-ui/service.yaml`

### Ingress

`kubectl apply -f gl-ingress/ingress.yaml`

#### DNS

Get minikube ip by executing `minikube ip` in a command prompt running as admin. Edit host file `C:\Windows\System32\drivers\etc\hosts` add entry `<minikube ip> grocery-list`. This maps minikube's host ip to `grocery-list`. The ingress service is exposed on the `grocery-list` DNS entry.

The application then may be access be executing `http://grocery-list/` in the browser.

## Other Useful Commands
### Ingress Status

`kubectl describe ingress --namespace default`

### Mongodb Database Clean Up

`kubectl delete statefulset mongo`

`kubectl delete svc mongo`

`kubectl delete pvc -l role=mongo`

## Source and Image Repositories

| Repo Name | Source | Docker Image |
| ----- | ----- | ----- |
| Department Micro-service | https://github.com/zmad5306/gl-dept | https://hub.docker.com/r/zmad5306/gl-dept/ |
| List Micro-service | https://github.com/zmad5306/gl-list | https://hub.docker.com/r/zmad5306/gl-list/ |
| Item Micro-service | https://github.com/zmad5306/gl-item | https://hub.docker.com/r/zmad5306/gl-item/ |
| API Gateway | https://github.com/zmad5306/gl-api | https://hub.docker.com/r/zmad5306/gl-api/ |
| Web Application (UI) | https://github.com/zmad5306/gl-ui | https://hub.docker.com/r/zmad5306/gl-ui/ |