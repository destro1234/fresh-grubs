import React, {useContext} from 'react'
import  {UserContext}  from '../context/user.js'
import NavBar from './NavBar.js'

function MostPopularItem() {
    const {currentOrder, setCurrentOrder} = useContext(UserContext)
    const {currentUser, setCurrentUser} = useContext(UserContext)

    const userItems = currentUser.order_items

    function countByName(userItems) {
        const count = {};
        for (let i = 0; i < userItems.length; i++) {
          const itemName = userItems[i].name;
          if (count[itemName] === undefined) {
            count[itemName] = 1;
          } else {
            count[itemName]++;
          }
        }
        return count;
      }

      const sortedItems = Object.keys(countByName(userItems))
      .sort((a, b) => countByName(userItems)[b] - countByName(userItems)[a])
      .map((key) => ({ name: key, count: countByName(userItems)[key] }));
      
      console.log(sortedItems)
    return (
        <div>
          <NavBar />
          { userItems.length > 0 ?
            <div>
            <h1>These are all the items you ordered!!</h1>
              <ol>
                {currentUser.order_items.map((i) => {
                console.log(currentUser.order_items)

                    return (
        
                  <li>{i.name} - {i.quantity}</li>
    
                  )
                })}
          </ol>

          <h2>This is your most popular item</h2>
        <h3>{sortedItems[0].name}, you have ordered this {sortedItems[0].count} times!</h3>

          </div>
          
        : <p>No items ordered yet.</p>}
            

        </div>
    )
}

export default MostPopularItem;