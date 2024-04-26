- `environment.yaml` : configMap and Secrets
- `deployment.yaml` : deployment, service, ingress

## Running in k8s

- I am using k3s for local development

- Rename `environment.example.yaml` to `environment.yaml` and fille the values of secrets

```bash
sudo k3s kubectl apply -f environment.yaml 
```

```bash
sudo k3s kubectl apply -f deployment.yaml
```
