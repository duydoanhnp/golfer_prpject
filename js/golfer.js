'use strict';


class Golfer extends React.Component {

  constructor(props) {
    super(props);
  }

  sumValues(values){
    return values.reduce((total, score) => total + score, 0);
  }

  renderTds(values) {
    return values.map(v => this.renderTd(v));
  };

  renderTd(value, className="") {
    return (<td><div className={className}>{value === 0 ? '-' : value}</div></td>);
  };

  renderScore(value) {
    return value === 0 ? 'E' : value > 0 ? '+'+value.toString() : value.toString()
  }

  renderScores(pars, scores) {
    let getClass = (par, score) => !score || par === score ? ""
        : par - score === 1 ? 'birdie'
        : par - score === -1 ? 'bogey'
        : par > score ? 'better' : 'bogey_plus';

    let result = [];
    for (let i = 0; i < scores.length; ++i){
      result.push(this.renderTd(scores[i], getClass(pars[i], scores[i])));
    }
    return result;
  };

  getToParClass() {
    return this.props.golfer.totalScore > 0 ? 'bogey_plus' : this.props.golfer.totalScore < 0 ? 'birdie' : '';
  }

  dashIfNotStarted(value) {
    return this.props.golfer.started ? value : '-';
  }

  WDIfNotStartedPos(value) {
    return this.props.golfer.started ? value : 'WD';
  }

  render() {
    if(this.props.pars.length > 18 || this.props.pars.length > 18){
      return '';
    }
    return (
        <div className={'accordion-item ' + (!this.props.filter || getSearchableStr(this.props.golfer.name).includes(this.props.filter) ? '' : 'd-none')}>
          <h2 className="accordion-header" id={'golfer-heading-' + this.props.golfer.id}>
            <a className="collapsed" data-bs-toggle="collapse" data-bs-target={'#golfer-' + this.props.golfer.id} aria-expanded="false"
               aria-controls={'golfer-' + this.props.golfer.id}>
              <table className="table summary m-0">
                <tbody>
                  <tr>
                    <td>{this.WDIfNotStartedPos(this.props.golfer.pos)}</td>
                    {/* <td className="d-none d-md-table-cell">Country</td> */}
                    <td className="wide">{this.props.golfer.name}</td>
                    <td>{this.dashIfNotStarted(this.props.golfer.thru)}</td>
                    <td><div className={'score '+ this.getToParClass()}>
                      {this.dashIfNotStarted(this.renderScore(this.props.golfer.totalScore))}
                    </div></td>
                    {/*<td>{this.props.golfer.hdc}</td>*/}
                    <td>{this.dashIfNotStarted(this.sumValues(this.props.golfer.scores))}</td>
                    {/*<td className="d-none d-md-table-cell">{this.sumValues(this.props.golfer.scores) === 0 ? 0 : this.sumValues(this.props.golfer.scores) - this.props.golfer.hdc}</td>*/}
                  </tr>
                </tbody>
              </table>
            </a>
          </h2>
          <div id={'golfer-' + this.props.golfer.id} className="accordion-collapse collapse" aria-labelledby={'golfer-heading-' + this.props.golfer.id}
               data-bs-parent="#scores-table">
            <div className="container-fluid p-3">
              <div className="row pb-5">
                <div className="col-lg-4 col-md-6">
                  <h3 className="text-center text-md-start pt-2 pb-4">{this.props.golfer.name}</h3>
                </div>
                <div className="col-lg-8 col-md-6 text-center">
                  <div className="row">
                    <div className="offset-3 col-2"><b>{this.dashIfNotStarted(this.props.golfer.thru)}</b><br/>Thru</div>
                    <div className="col-2"><b>{this.dashIfNotStarted(this.renderScore(this.props.golfer.totalScore))}</b><br/>Score</div>
                    {/*<div className="col-2"><b>{this.props.golfer.hdc}</b><br/>HDC</div>*/}
                    <div className="col-2"><b>{this.dashIfNotStarted(this.sumValues(this.props.golfer.scores))}</b><br/>Gross</div>
                    {/*<div className="col-2"><b>{this.sumValues(this.props.golfer.scores) - this.props.golfer.hdc}</b><br/>Net</div>*/}
                  </div>
                </div>
              </div>
              <div className="row p-0">
                <div className="col-2 col-lg-2 p-0">
                  <table className="table table-bordered w-100">
                    <tbody>
                      <tr>
                        <td><div>Hole</div></td>
                      </tr>
                      <tr>
                        <td><div>Par</div></td>
                      </tr>
                      <tr className="scores-row">
                        <td><div>Score</div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-10 col-lg-4 p-0">
                  <table className="table table-bordered result-table">
                    <tbody>
                      <tr>
                        {this.renderTds(this.props.holes.slice(0,9))}
                        <td><div className="w-100">Out</div></td>
                      </tr>
                      <tr>
                        {this.renderTds(this.props.pars.slice(0,9))}
                        <td><div className="w-100">{this.sumValues(this.props.pars.slice(0,9))}</div></td>
                      </tr>
                      <tr className="scores-row">
                        {this.renderScores(this.props.pars.slice(0,9), this.props.golfer.scores.slice(0,9))}
                        <td><div className="w-100">{this.sumValues(this.props.golfer.scores.slice(0,9))}</div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-2 d-lg-none p-0">
                  <table className="table table-bordered w-100">
                    <tbody>
                      <tr>
                        <td><div>Hole</div></td>
                      </tr>
                      <tr>
                        <td><div>Par</div></td>
                      </tr>
                      <tr className="scores-row">
                        <td><div>Score</div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-10 col-lg-4 p-0">
                  <table className="table table-bordered result-table">
                    <tbody>
                      <tr>
                        {this.renderTds(this.props.holes.slice(9))}
                        <td><div className="w-100">In</div></td>
                      </tr>
                      <tr>
                        {this.renderTds(this.props.pars.slice(9))}
                        <td><div className="w-100">{this.sumValues(this.props.pars.slice(9))}</div></td>
                      </tr>
                      <tr className="scores-row">
                        {this.renderScores(this.props.pars.slice(9), this.props.golfer.scores.slice(9))}
                        <td><div className="w-100">{this.sumValues(this.props.golfer.scores.slice(9))}</div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-lg-2 d-none d-lg-block p-0">
                  <table className="table table-bordered d-none d-lg-table w-100 text-center total-table">
                    <tbody>
                      <tr>
                        <td className="w-50">
                          <div>Total</div>
                        </td>
                        <td className="w-50">
                          <div>To Par</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="w-50">
                          <div>{this.sumValues(this.props.pars)}</div>
                        </td>
                        <td className="w-50">
                          <div>&nbsp;</div>
                        </td>
                      </tr>
                      <tr className="scores-row">
                        <td className="w-50">
                          <div>{this.sumValues(this.props.golfer.scores)}</div>
                        </td>
                        <td className="w-50">
                          <div className={'score ' + this.getToParClass()}>{this.dashIfNotStarted(this.renderScore(this.props.golfer.totalScore))}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12 text-end">
                  <span className="color-info better ms-3"></span>
                  <span className="color-info-label ms-2">Eagle or Better</span>
                  <span className="color-info birdie ms-3"></span>
                  <span className="color-info-label ms-2">Birdie</span>
                  <span className="color-info bogey ms-3"></span>
                  <span className="color-info-label ms-2">Bogey</span>
                  <span className="color-info bogey_plus ms-3"></span>
                  <span className="color-info-label ms-2">Double Bogey +</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    );

  }
}