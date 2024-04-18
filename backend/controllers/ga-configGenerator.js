const yaml = require('js-yaml');

const generateGitHubActionsConfig = (branchName, language, requireTests, username, imageName, registryUrl) => {
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
          // Set up environment and install dependencies based on the selected language
          {
            name: 'Set up environment and install dependencies',
            run: getEnvironmentSetupScript(language)
          },
          // Run tests if required
          {
            name: 'Run Tests',
            run: getTestScript(language,requireTests)
          },
          {
            name: 'Set up Docker Buildx',
            uses: 'docker/setup-buildx-action@v1'
          },
          {
            name: 'Login to Docker Registry',
            run: registryUrl ? `echo "\${{ secrets.DOCKER_PASSWORD }}" | docker login ${registryUrl} --username "\${{ secrets.DOCKER_USERNAME }}" --password-stdin` :
                               `echo "\${{ secrets.DOCKER_PASSWORD }}" | docker login docker.io --username "\${{ secrets.DOCKER_USERNAME }}" --password-stdin`
          },
          {
            name: 'Build and push Docker image',
            run: `docker buildx create --use && docker buildx build --platform linux/amd64,linux/arm64 -t ${username}/${imageName} --push .`,
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

// Function to get the environment setup script based on the selected language
const getEnvironmentSetupScript = (language) => {
  switch (language) {
    case 'javascript':
      return 'npm install';
    case 'golang':
      return 'go get ./...';
    case 'python':
      return 'pip install -r requirements.txt';
    default:
      return 'echo "Unsupported language"';
  }
};

// Function to get the test script based on the selected language
const getTestScript = (language,requireTests) => {
  if (requireTests==='true'){
    switch (language) {
      case 'javascript':
        return 'npm test';
      case 'golang':
        return 'go test ./...';
      case 'python':
        return 'pytest';
      default:
        return 'echo "Unsupported language"';
    }
  }
  else{
    return 'echo "no tests defined"'
  }
};

module.exports = {
  generateGitHubActionsConfig
};
