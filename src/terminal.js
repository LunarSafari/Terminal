
class Terminal {
	constructor(dom){
		this.dom = dom
		this.contentDom = this.dom.querySelector('.content')
		this.inputContentDom = this.dom.querySelector('.input-area span')
		this.textareaDom = this.dom.querySelector('.input-area textarea')

		this.dom.addEventListener('click', e => {
			this.textareaDom.focus()
			this.updateInput({target: this.textareaDom})
		})
		this.textareaDom.addEventListener('input', this.updateInput.bind(this))
		this.textareaDom.addEventListener('keydown', e => {
			switch(e.key){
				case 'Enter':
					var command = this.textareaDom.value
					this.textareaDom.value = ''
					this.handleCommand(command)
					break
				default:
					setTimeout(_ => this.updateInput.call(this, e), 0)
			}
		})
		this.textareaDom.addEventListener('blur', this.hideCursor.bind(this))
	}

	print(text){
		var div = document.createElement('div')
		div.textContent = text

		this.contentDom.appendChild(div)
	}

	newline(){
		this.contentDom.appendChild(document.createElement('br'))
	}

	//[{content, callback}]
	addOptions(arr){
		var optionWrap = document.createElement('div')
		optionWrap.className = 'options'
		arr.map(x => {
			var div = document.createElement('div')
			div.className = 'option available'
			div.textContent = x.content
			div.addEventListener('click', e => {
				if(!e.target.classList.contains('available')) return;
				e.target.parentNode.querySelectorAll('.option').kq(Array.from).map(o => {
					o.classList.add('hidden')
					o.classList.remove('available')
				})
				e.target.classList.remove('hidden')
				x.callback()
			})
			optionWrap.appendChild(div)
		})
		this.contentDom.appendChild(optionWrap)
	}

	splitText(text, index){
		return [text.slice(0, index), text[index], text.slice(index+1)]
	}

	renderToSpan([start, current, end]){
		var result = []
		result.push(document.createTextNode(start))
		var cursorSpan = document.createElement('span')
		cursorSpan.className = 'cursor'
		if(current){
			cursorSpan.textContent = current
		} else {
			cursorSpan.innerHTML = '&nbsp;'
		}
		result.push(cursorSpan)
		if(end){
			result.push(document.createTextNode(end))
		}
		return result
	}

	updateInput(e){
		var cursorPosition = e.target.selectionStart
		var nodes = this.renderToSpan(this.splitText(e.target.value, cursorPosition))
		this.inputContentDom.innerHTML = ''
		nodes.map(x => this.inputContentDom.appendChild(x))
	}

	hideCursor(){
		this.dom.querySelectorAll('.cursor').kq(Array.from).map(x => x.style.display = 'none')
	}

	handleCommand(command){
		this.print(`> ${command}`)
		var matchData = command.match(/(\d+)d(\d+)/)
		if(matchData){
			var result = Array(+matchData[1]).fill().map(_ => this.randomInteger(1, +matchData[2])).reduce((s, i) => s += i)
			this.print(result)
		} else {
			this.print(eval(command))
		}
	}

	randomInteger(min, max){
		return Math.floor(Math.random() * (max - min + 1) + min)
	}
}

export default Terminal