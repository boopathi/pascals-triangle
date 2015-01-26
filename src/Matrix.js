module.exports = Matrix;

function Matrix(ctx, grid) {
	this.grid = grid;
	this.ctx = ctx;

	this.init();

	//draw
	this.draw();
}

Object.defineProperties(Matrix.prototype, {
	highlights: {
		set: function(h) {
			this.init();
			this._highligher = h;
			this._highlights = this.grid[h]();
			this.draw();
		}
	},
	align: {
		set: function(align) {
			if(_.contains(['left', 'center', 'right'], align))
				this._align = align;
			else
				throw new Error('Alignment must be one of left, right, center');
		}
	},
	n: {
		set: function(val) {
			this.grid.n = val;
			this.init();
			this._highlights = this.grid[this._highligher]();
			this.draw();
		}
	}
});

Matrix.prototype.init = function() {

	//settings
	this.size = Math.min(this.ctx.canvas.width, this.ctx.canvas.height) / this.grid.n / 1.3;
	this.offset =  this.size;

	this._highlights = this.grid.each(()=>true);
	this._align = 'center';

};

Matrix.prototype.normalize = function(e, s, t) {
	return e * t / s;
};

Matrix.prototype.setHighlights = function(h) {
	this.highlights = h;
};

Matrix.prototype.getPosition = function(i, j) {
	var scale = this.size * 1.2,
		x = j * scale,
		y = i * scale + this.offset;
	switch(this._align) {
		case 'left':
			x += this.offset;
			break;
		case 'right':
			x = this.ctx.canvas.width - this.offset - x;
			break;
		case 'center':
			x += (this.ctx.canvas.width - i * scale) / 2;
			break;
	}
	return {
		x: x,
		y: y
	};
};

Matrix.prototype.draw = function() {
	var ctx = this.ctx;

	ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

	this.grid.each(function(e, i, j) {
		var pos = this.getPosition(i, j);
		var w = this.size / 2,// + this.normalize(e, 0, this.grid.biggest(), 0, 5),
			h = this._highlights[i][j] ? 1 : 0.25;

		ctx.fillStyle = 'rgba(255,255,255,'+ h +')';
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, w, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = 'rgba(128,0,128,'+ h +')';
		ctx.font = (this.size / 3.7) + 'px Arial';
		var tw = ctx.measureText(e.toString()).width;
		var th = ctx.measureText('w').width;
		ctx.fillText(e.toString(), pos.x - tw/2, pos.y + th/2);

	}.bind(this));
};

Matrix.prototype.applyBoolean = function() {

};