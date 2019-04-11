const functional = (componentName) => (
  `import React from 'react';
import PropTypes from 'prop-types';

const ${componentName} = (props) => (
  <div>
    Hello world from ${componentName}
  </div>
);

${componentName}.displayName = '${componentName}'

${componentName}.propTypes = {}

${componentName}.contextTypes = {}

export default ${componentName};
  `
)


exports.functional = functional