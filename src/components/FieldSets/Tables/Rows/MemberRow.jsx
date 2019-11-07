import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { TableRow, TableColumn } from 'react-md';

export default class MemberRow extends PureComponent {
  static propTypes = {
    isNew: PropTypes.bool,
    member: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      dob: PropTypes.string,
      roles: PropTypes.array,
    }).isRequired,
    className: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = { highlight: props.isNew ? true : null };
  }

  componentDidMount() {
    if (!this.state.highlight) {
      return;
    }

    // Keep highlight color for 4 seconds then fade out for 2 seconds.
    this.timeout = setTimeout(() => {
      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.setState({ highlight: null });
      }, 2000);

      this.setState({ highlight: false });
    }, 4000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { highlight } = this.state;
    const {
      member,
      className,
      isNew, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const cells = Object.keys(member).map((key, i) => (
      <TableColumn key={key} numeric={false}>{member[key]}</TableColumn>
    ));
    return (
      <TableRow
        {...props}
        className={cn(className, {
          'md-background--card': highlight !== null,
          'data-tables__members__row': highlight !== null,
          'data-tables__members__row--highlight': highlight,
        })}
      >
        {cells}
      </TableRow>
    );
  }
}
