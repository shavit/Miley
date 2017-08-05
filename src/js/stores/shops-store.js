import constants from '../constants'
import dispatcher from '../dispatcher'
import {EventEmitter} from 'events'


let _shops = [
  {id: 0, name: 'Store 1', liked: false, created: 1301953702970},
  {id: 1, name: 'Store 2', liked: false, created: 1201953712278},
  {id: 2, name: 'Store 3', liked: false, created: 1401953702978},
]
function getShops(){
  return _shops
}
function setShopLike(shop, user){
  _shops = _shops.map(x => {
    if (x.id == shop.id){
      x.liked = !shop.liked
    }
    return x
  })
}

// Inherit from EventEmitter
export class ShopStore extends EventEmitter{
  getShops: getShops,
  emitChange: () => {
    this.emit('CHANGE_EVENT')
  },
  addChangeListener: callback => {
    this.on('CHANGE_EVENT', callback)
  },
  removeChangeListener: callback => {
    this.removeListener('CHANGE_EVENT', callback)
  }
}

dispatcher.register(action => {
  switch (action.actionType) {
    case 'LIKE_SHOP':
      setShopLike(action.shop, action.user)
      ShopStore.emitChange()
      break
    default:
      break
  }
})