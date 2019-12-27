'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {
	// Have Yeoman greet the user.
	const prompts = [
	    {
		type: 'input',
		name: 'projectName', // Used in package.json
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
	// Project files and folders
	this.fs.copy(
	    this.templatePath('src'),
	    this.destinationPath('./src')
	);
	this.fs.copy(
	    this.templatePath('styles'),
	    this.destinationPath('./styles')
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
