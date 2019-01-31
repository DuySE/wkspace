import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Code from './Code';
import './Problem.css';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/contrib/auto-render/auto-render';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

function textArray(ar) {
  return ar.map((paragraph, i) => <p key={i}>{paragraph}</p>);
}

class Problem extends Component {
  problemArea = React.createRef();

  componentDidUpdate() {
    if (this.problemArea.current) {
      renderMathInElement(this.problemArea.current, {
        delimiters: [
          { left: "$$$$$$", right: "$$$$$$", display: true },
          { left: "$$$", right: "$$$", display: false }
        ]
      });
    }
  }

  render() {
    const { problem } = this.props;
    return problem && (
      <div className="problem-area" ref={this.problemArea}>
        <div className="header">
          <h2 className="title">
            {problem.title} <a href={problem.link} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          </h2>
          <div className="time-limit">Time limit: {problem.timeLimit}</div>
          <div className="memory-limit">Memory limit: {problem.memoryLimit}</div>
        </div>
        <div className="statement">
          {textArray(problem.statement.text)}

          <div className="input-spec">
            <h3 className="section-title">Input ({problem.input})</h3>
            {textArray(problem.statement.inputSpec)}
          </div>

          <div className="output-spec">
            <h3 className="section-title">Output ({problem.output})</h3>
            {textArray(problem.statement.outputSpec)}
          </div>

          {problem.statement.notes.length ? (
            <div className="notes">
              <h3 className="section-title">Notes</h3>
              {textArray(problem.statement.notes)}
            </div>
          ) : null}
        </div>
        {problem.statement.sampleTests.length ? (
          <Table className="sample-tests">
            <thead>
              <tr>
                <th>Sample Input</th>
                <th>Sample Output</th>
              </tr>
            </thead>
            <tbody>
              {problem.statement.sampleTests.map(({ input, output }, i) => (
                <tr key={i}>
                  <td><Code value={input} /></td>
                  <td><Code value={output} /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </div>
    );
  }
}

export default Problem;
