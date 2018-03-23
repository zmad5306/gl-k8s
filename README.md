# gl-k8s
Kubernetes manifests for grocery list application

## gl-db mongodb database

### Deploy

`kubectl apply -f gl-db/mongo-statefulset.yaml`

### Clean up

`kubectl delete statefulset mongo`

`kubectl delete svc mongo`

`kubectl delete pvc -l role=mongo`

## Ingress

### Setup DNS

Get minikube ip by executing `minikube ip` in a command prompt running as admin. Edit host file `C:\Windows\System32\drivers\etc\hosts` add entry `<minikube ip> grocery-list`. This maps minikube's host ip to `grocery-list`. The ingress service is exposed on the `grocery-list` DNS entry.

The application then may be access be executing `http://grocery-list/` in the browser.

#### Ingress Status

`kubectl describe ingress --namespace default`