const yaml = require('js-yaml');

const generateGitHubActionsConfig = (branchName, language, requireTests, username, imageName) => {
  // Validate input parameters (optional)
  if (!branchName || !username || !imageName) {
    throw new Error('Missing required arguments: branchName, username, imageName');
  }

  let config = {
    name: 'Docker Build and Push',
    on: {
      push: {
        branches: [branchName]
      }
    },
    jobs: {
      build: {
        'runs-on': 'ubuntu-latest',
        steps: [
          {
            name: 'Checkout',
            uses: 'actions/checkout@v2'
          },
          {
            name: 'Run Tests',
            uses: 'actions/setup-go@v2',
            with: {
              'go-version': '1.21.8'
            },
            run: requireTests && language === 'go' ? 'go test ./...' : ''
          },
          {
            name: 'Set up Docker Buildx',
            uses: 'docker/setup-buildx-action@v1'
          },
          {
            name: 'Login to Docker Hub',
            run: `echo "\${{ secrets.DOCKER_HUB_PASSWORD }}" | docker login --username "\${{ secrets.DOCKER_HUB_USERNAME }}" --password-stdin`
          },
          {
            name: 'Build and push Docker image',
            run: `docker buildx create --use && docker buildx build --platform linux/amd64,linux/arm64 -t ${username}/${imageName}:latest --push .`,
            env: {
              DOCKER_USERNAME: '${{ secrets.DOCKER_USERNAME }}',
              DOCKER_PASSWORD: '${{ secrets.DOCKER_PASSWORD }}'
            }
          }
        ]
      }
    }
  };

  // Convert the configuration object to YAML format
  const yamlConfig = yaml.dump(config);

  return yamlConfig;
};

module.exports = {
  generateGitHubActionsConfig
};
