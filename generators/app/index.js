'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the world-class ${chalk.red('generator-elm-b')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

    writing() {
      this.fs.copy(
	  this.templatePath('src'),
	  this.destinationPath('./src')
      );
      this.fs.copy(
	  this.templatePath('styles'),
	  this.destinationPath('./styles')
      );
	this.fs.copy(
	    this.templatePath('gitignore'),
	    this.destinationPath('.gitignore')
	);
	this.fs.copy(
	    this.templatePath('gulpfile.js'),
	    this.destinationPath('gulpfile.js')
	);
	this.fs.copy(
	    this.templatePath('rollup.config.js'),
	    this.destinationPath('rollup.config.js')
	);
      this.fs.copyTpl(
      this.templatePath('package.json'),
	this.destinationPath('package.json'),
	this.props
    );
  }
  install() {
      this.installDependencies({
	  yarn: true,
	  npm: false,
	  bower: false,
      });
  }

};
