var Pascal = require('./src/Pascal'),
	Matrix = require('./src/Matrix'),
	p = new Pascal(10),
	classSet = React.addons.classSet;

var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;
var ctx = canvas.getContext('2d');

var m = new Matrix(ctx, p);

var Panel = React.createClass({
	getDefaultProps: function() {
		return {
			align: ['left', 'center', 'right'],
			filter: ['all','odd','even','primes'],
			size: ['minus', 'plus']
		}
	},
	getInitialState: function() {
		return {
			align: 'center',
			filter: 'all'
		}
	},
	setAlign: function(align) {
		this.setState({
			align: align
		});
		m.align = align;
	},
	setFilter: function(h) {
		this.setState({
			filter: h
		});
		m.highlights = h;
	},
	setSize: function(size) {
		switch(size) {
			case 'minus':
				if(m.n > 0) m.n--;
			break;
			case 'plus':
				if(m.n < 64) m.n++;
			break;
		}
	},
	render: function() {
		var classes = classSet({
			'btn':true,
			'btn-default':true,
		});
		return <div id="controls">
			<div className='btn-group align'>
				{this.props.align.map(function(i) {
					var classes = classSet({
						btn: true,
						'btn-default': true,
						active: this.state.align === i
					}),
						iconClasses = classSet('fa', 'fa-align-' + i),
						boundSetAlign = this.setAlign.bind(this, i);
					return <a className={classes} onClick={boundSetAlign}>
						<i className={iconClasses}></i>
					</a>
				}.bind(this))}
			</div>
			<div className='btn-group filter'>
				{this.props.filter.map(function(i) {
					var classes = classSet({
						btn: true,
						'btn-default': true,
						active: this.state.filter === i
					}),
						boundSetFilter = this.setFilter.bind(this, i);
					return <a className={classes} onClick={boundSetFilter}>
						{i}
					</a>
				}.bind(this))}
			</div>
			<div className='btn-group size'>
				{this.props.size.map(function(i) {
					var iconClasses = classSet('fa', 'fa-' + i),
						boundSetSize = this.setSize.bind(this, i);
					return <a className={classes} onClick={boundSetSize}>
						<i className={iconClasses}></i>
					</a>
				}.bind(this))}
			</div>
		</div>;
	}
});

document.addEventListener('DOMContentLoaded', function() {
	React.render(<Panel/>, document.getElementById('react'));
	activateControls();
});

// End components

// m.highlights = 'odd';
// var i = 0;
// function step() {
// 	m.n = i++;
// 	if(i%2) m.highlights = 'even';
// 	else m.highlights = 'odd';
// 	if(i<70) window.requestAnimationFrame(step);
// 	else activateControls();
// }
// requestAnimationFrame(step);

function activateControls() {
	// var resizeTimeout;
	window.addEventListener('resize', function() {
		// clearTimeout(resizeTimeout);
		// resizeTimeout = setTimeout(function() {
			canvas.width = m.ctx.width = window.innerWidth;
			canvas.height = m.ctx.height = window.innerHeight - 40;
			m.computeSize();
			m.draw();
		// }, 250);
	});
}