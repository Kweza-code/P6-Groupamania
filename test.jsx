constructor(props) {
    super(props);
    this.state = {name: '', message: '', email: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(key) {
    return function (e) {
        var state = {};
        state[key] = e.target.value;
        this.setState(state);
    }.bind(this);
}