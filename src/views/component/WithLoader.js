import React, { Component } from 'react'

export function partial(fn, ...presetArgs) {
    return function partiallyApplied(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

class WithLoaderComponent extends Component {
    state={
        loading:false
    }
    _toggleLoading = loading => this.setState({ loading })
    startLoading = partial(this._toggleLoading, true)
    stopLoading = partial(this._toggleLoading, false)

    render() {
        const { WrappedComponent, WrappedProps } = this.props
        return <WrappedComponent
            startLoading={this.startLoading}
            stopLoading={this.stopLoading}
            loading={this.state.loading}
            {...WrappedProps}
        />
    }
}
export default WrappedComponent =>
    WrappedProps =>
        <WithLoaderComponent
            WrappedComponent={WrappedComponent}
            WrappedProps={WrappedProps}
/>