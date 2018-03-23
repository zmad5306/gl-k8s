# gl-k8s
Kubernetes manifests for grocery list application

## gl-db mongodb database

### Deploy

`kubectl apply -f gl-db/mongo-statefulset.yaml`

### Clean up

`kubectl delete statefulset mongo`

`kubectl delete svc mongo`

`kubectl delete pvc -l role=mongo`