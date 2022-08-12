'use strict';

class Golfers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searching: '',
            holes : Array(18).fill(''),
            pars : Array(18).fill(0),
            golfers : [],
        }
        this.updateConfigs()
            .then(() => this.updateGolfers());

        let updateSearch = (str) => this.setState({searching: str});
        document.getElementById('name-search').onkeyup = (ev) => {
            updateSearch(getSearchableStr(ev.target.value));
        }
        let updateData = () => this.updateGolfers();
        document.getElementById('view-score-float-btn').onclick = () => {
            $("html, body").animate({
                scrollTop: document.getElementById('livescore').offsetTop - 100
            }, 600);
            updateData();
        }

    }

    render() {
        return this.state.golfers.map(golfer => (<Golfer key={golfer.id} filter={this.state.searching} holes={this.state.holes} pars={this.state.pars} golfer={golfer} />))
    }

    async updateConfigs(){
        await fetch('/score/holes')
            .then(response => response.json())
            .then(holes => {
                let holesInf = []
                let parsInf = []
                holes.data.forEach((el) => {
                    holesInf.push(el.holeName)
                    parsInf.push(el.parValue)
                })

                this.setState({
                    holes: holesInf,
                    pars: parsInf
                });
            });    
    }

    async updateGolfers(){
        let golfers = (await fetch('/score/board').then(response => response.json())).data;
        golfers.forEach(golfer => {
            golfer.name = golfer.playerName;
            golfer.hdc = golfer.handicap;
            golfer.thru = golfer.Holes.length === 18 ? 'F' : golfer.Holes.length;

            golfer.scores = Array(18).fill(0);
            golfer.totalScore = 0;
            golfer.started = golfer.Holes.length > 0;
            golfer.Holes.forEach(hole => {
                golfer.totalScore += (hole.player_hole.score - this.state.pars[hole.holeIndex-1])
                golfer.scores[hole.holeIndex-1] = hole.player_hole.score;
            });
        });
        golfers.sort((c, other) => !other.started ? -1 : !c.started ? 1 : c.totalScore - other.totalScore);
        golfers.forEach((golfer, index) => {
            golfer.pos = index === 0 ? 1
                : golfer.totalScore === golfers[index - 1].totalScore ? golfers[index - 1].pos
                : index + 1;
        });

        this.setState({golfers : golfers});
        let today = new Date();
        document.getElementById("updated-date").innerText = today.toLocaleDateString("vi-VN");
        document.getElementById("updated-time").innerText = today.toLocaleTimeString("vi-VN").substring(0, 5);

        setTimeout(() => this.updateGolfers(), 1000 * 60);
    }

}