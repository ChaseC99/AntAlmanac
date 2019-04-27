import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Popover, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import rmpData from "./RMP.json";

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  }
});

class Instructors extends React.Component {
  state = {
    anchorEl: null,
    mouseInPopover: false
  };

  handlePopoverOpen = event => {
    const oldTarget = event.currentTarget;
    this.setState({ mouseInPopover: true });
    setTimeout(() => {
      if (this.state.mouseInPopover)
        this.setState({ anchorEl: oldTarget });
    }, 500);
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null, mouseInPopover: false });
  };

  redirect = (e, name) => {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var lastName = name.substring(0, name.indexOf(","));
    var nameP = rmpData[0][name];
    if (nameP !== undefined)
      window.open("https://eaterevals.eee.uci.edu/browse/instructor#"+lastName);
      //window.open("https://www.ratemyprofessors.com" + nameP);
    else
      window.open("https://eaterevals.eee.uci.edu/browse/instructor#"+lastName);
  };

  linkRMP = name => {
    const rmpStyle = {
      textDecoration: "underline",
      color: "#0645AD",
      cursor: "pointer"
    };
    return name.map(item => {
      if (item !== "STAFF") {
        return (
          <div
            style={rmpStyle}
            onClick={e => {
              this.redirect(e, item);
            }}
          >
            {item}
          </div>
        );
      } else return item;
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
          className={this.props.className}
        >
        {this.linkRMP(this.props.children)}
        </Typography>
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>
            Links to EaterEval; See Settings
          </Typography>
        </Popover>
      </Fragment>
    );
  }
}

Instructors.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Instructors);