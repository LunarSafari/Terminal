require('file?name=[name].[ext]!./index.html')
require('style!css!./style/terminal.css')

import kq from 'killerqueen'
import Terminal from './terminal'

kq.sheerHeartAttack()

var terminal = Terminal.new(document.querySelector('.terminal'))
terminal.print('欢迎来到罗科工业（TM）终端机连线')
terminal.print('密等：限避难所科技保全')
terminal.newline()

terminal.addOptions([
	{content: '[111号避难所保全说明]', callback: (e => e)},
	{content: '[操作通讯协定手册]', callback: (e => e)},
	{content: '[安全日志]', callback: (e => e)}
])
terminal.newline()