import React, { Component } from 'react'
import { render } from 'react-dom'

import { Layout, Navbar } from './components'

import FRC, { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } from 'formsy-react-components'

import { keys, map, isArray, sortBy } from 'lodash'
import numeral from 'numeral'
import request from 'superagent'

const Request = ({ onSubmit }) => (
    <FRC.Form onSubmit={onSubmit}>
        <fieldset>
            <legend>Request</legend>
            <Input name="f" id="f" value="xs**2" label="Function" type="text" help="Use `xs` for variable name" required />
            <Input name="a" id="a" value="0" label="a" type="number" required />
            <Input name="b" id="b" value="2" label="b" type="number" required />
            <Input name="c" id="c" value="0" label="c" type="number" required />
            <Input name="d" id="d" value="2" label="d" type="number" required />
            <Input name="size" id="size" value="" label="size" type="number" placeholder="100" />
        </fieldset>
        <fieldset>
            <Row>
                <input className="btn btn-primary" type="submit" defaultValue="Submit" />
            </Row>
        </fieldset>
    </FRC.Form>
)

const Pending = ({ id }) => <h2>Pending #{id}</h2>
class Result extends Component {
    constructor(props) {
        super(props)
        const { id, value } = this.props
        const [approx, script, div] = isArray(value) ? value : [value, undefined, undefined]
        this.state = { approx, script, div }
    }

    componentDidMount() {
        const { script } = this.state
        if (!script) return

        const parser = new DOMParser()
        const scriptNode = parser.parseFromString(script, "text/html").getElementsByTagName('script')[0]
        eval(scriptNode.text)
    }

    render() {
        const { id } = this.props
        const { approx, script, div } = this.state

        return (
            <div style={{ marginBottom: '2rem' }}>
                <h2>Result #{id}</h2>
                <h3>Approximate Value: { approx }</h3>
                { div ? <div dangerouslySetInnerHTML={{__html: div}} /> : null }
            </div>
        )
    }
}

const rootUrl = new URL(window.location.origin)
rootUrl.port = 5000

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = { results: {}, pending: {} }

    }

    poll(id) {
        return () => {
            request.get(new URL(id, rootUrl)).end( (err, res) => {
                if (err) return

                const { result } = res.body
                if (!result) return

                const { results, pending } = this.state

                clearInterval(pending[id])
                delete pending[id]

                this.setState({ results: { ...results, [id]: result } })
            })
        }
    }

    onSubmit({ f, a, b, c, d, size }) {
        const payload = {
            f:    f,
            a:    numeral(a).value(),
            b:    numeral(b).value(),
            c:    numeral(c).value(),
            d:    numeral(d).value(),
        }
        if (size) payload.size = numeral(size).value()

        request.put(rootUrl).send(payload).end( (err, res) => {
            if (err) return

            const { results, pending } = this.state
            console.log(res.body)
            const { result: id } = res.body
            const timers = {[id]:  setInterval(this.poll(id),  500)}

            this.setState({ pending: {...pending, ...timers} })
        })
    }

    render() {
        const { results, pending } = this.state

        return (
            <div className="row">
                <div className="col-xs-6 offset-xs-3">
                    <Request onSubmit={::this.onSubmit} />
                    { map(sortBy(keys(pending), [x => -x]), id => <Pending key={id} id={id} />) }
                    { map(sortBy(keys(results), [x => -x]), id => <Result key={id}  id={id} value={results[id]} />) }
                </div>
            </div>
        )
    }
}

render(
    <Layout main={<Main />} navbar={<Navbar />} />,
    document.getElementById('root')
)
