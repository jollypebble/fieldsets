const formFields = [
  [
    { id: 1, name: 'accountName', label: 'Account Name', isRequired: true },
    { id: 2, name: 'clientName1', label: 'Client Name 1', isRequired: true },
    { id: 3, name: 'clientName2', label: 'Client Name 2', isRequired: false }
  ],
  [
    { id: 1, name: 'cpaName', label: 'CPA Name', isRequired: true },
    { id: 2, name: 'attyName', label: 'ATTY Name', isRequired: true },
    { id: 3, name: 'ipAddress', label: 'IP', isRequired: true }
  ]
];

export default class ClientSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dependencies: []
    };
  }

  handleDependencyChange = (index, value) => {
    this.setState({
      dependencies: this.state.dependencies.map((item, i) => {
        if (index === i) return value;
        return item;
      })
    });
  }

  addDependency = () => {
    this.setState({ dependencies: this.state.dependencies.concat('') });
  };

  removeDependency = (index) => {
    this.setState({ dependencies: this.state.dependencies.filter((item, i) => index !== i) });
  };

  isValidForm = () => {
    let isValid = true;
    formFields.forEach(field => {
      field.forEach(subField => {
        if (subField.isRequired && !this.state[subField.name]) isValid = false;
      })
    });
    return isValid;
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  renderFormField = (index) => {
    return formFields[index].map(item => (
      <div key={ item.id } className="form-control">
        <TextField
          id={ item.name }
          label={ item.label }
          ref={ field => { this[item.name] = field } }
          onChange={value => this.handleChange(item.name, value)}
          required={item.isRequired}
        />
      </div>
    ))
  };

  renderDependencies = () => {
    const { dependencies } = this.state;

    return dependencies.map((item, index) => (
      <div key={ index } className="form-control">
        <TextField
          id={ item }
          label={`Dependent Name${index + 1}`}
          value={ item }
          onChange={ (value) => this.handleDependencyChange(index, value) }
        />
        <FontIcon onClick={() => this.removeDependency(index) }>remove</FontIcon>
      </div>
    ))
  };

  renderClientTable = () => {
    const { clients } = this.props;

    return (
      <Card className="client-table">
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <TableColumn>Account Name</TableColumn>
              <TableColumn>Client Name</TableColumn>
              <TableColumn>CPA Name</TableColumn>
              <TableColumn>ATTY Name</TableColumn>
              <TableColumn>IP</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { clients.map((client, i) => (
              <TableRow key={ i }>
                <TableColumn>{ client.accountName }</TableColumn>
                <TableColumn>{ client.clientName1 }</TableColumn>
                <TableColumn>{ client.cpaName }</TableColumn>
                <TableColumn>{ client.attyName }</TableColumn>
                <TableColumn>{ client.ipAddress }</TableColumn>
              </TableRow>
            )) }
          </TableBody>
        </DataTable>
        {!clients.length && <p>No data</p>}
      </Card>
    );
  };

  render() {
    return (
      <div className="drawer-sheet clientSheetContainer">
        <div className="form-group">
          { this.renderFormField(0) }
          <div className="dependency-panel">
            <h5 className="dependency-title">
              Dependent Names
              <FontIcon onClick={ this.addDependency }>add</FontIcon>
            </h5>
            { this.renderDependencies() }
          </div>
          { this.renderFormField(1) }
          <div className="add-btn">
            <Button raised primary disabled={!this.isValidForm()} onClick={this.props.onSave}>Add</Button>
          </div>
        </div>
        { this.renderClientTable() }
      </div>
    );
  }
}

ClientSheet.propTypes = {
  clients: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};
