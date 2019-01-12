const statefull = (componentName) => (
`import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ${componentName} extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div>
        Hello world from ${componentName}
      </div>
    )
  }
}

${componentName}.displayName = ${componentName}

${componentName}.propTypes = {}

${componentName}.contextTypes = {}

export default ${componentName}

`
)

exports.statefull = statefull