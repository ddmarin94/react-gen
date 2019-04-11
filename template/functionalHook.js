const functionalHook = (componentName) => (
  `import React, { useState } from 'react';

const ${componentName} = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

${componentName}.displayName = '${componentName}'

${componentName}.propTypes = {}

${componentName}.contextTypes = {}

export default ${componentName};
  `
)

exports.functionalHook = functionalHook
