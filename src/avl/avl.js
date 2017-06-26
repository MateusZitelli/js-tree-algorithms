'use strict'
// AVL trees are the first self-balancing binary search trees.
//
// An AVL tree is unbalanced when de difference between the height of the right
// and left sub-tree of any node is bigger than two.
//
// The balancement is made based on sub-tree rotations. 


/**
 * Represents an AVL tree, sub-tree or node.
 *
 * @param {Integer} value
 * @param {Avl} leftTree
 * @param {Avl} rightTree
 *
 */
var Avl = function(value, leftTree, rightTree){
  this.value = value || null;
  this.left = leftTree || null;
  this.right = rightTree || null;
  this.height = (!!this.left || !!this.right) ? undefined : 0;
};

Avl.prototype.getDepthFromChilds = function(){
  var lHeight = !!this.left ? this.left.height : 0; 
  var rHeight = !!this.right ? this.right.height : 0;  
  if(lHeight === rHeight === 0){
    return;
  }
  if(lHeight > rHeight){
    this.height = lHeight + 1;
  }else{
    this.height = rHeight + 1;
  }
};
 
// *Applying the LL rotation to a tree reusing the nodes*
// 
// - We started with this tree:
// ```
//        A
//      /   \
//     B     C
//          / \
//         D   E
// ```
// - And want this one:
// ```
//        C
//      /   \
//     A     E
//    / \
//   B   D
// ```
// - First we swap the right and left sides of the tree, with this we can have 
// the tree with the desired layout:
// ```
//        A
//      /   \
//     C     B
//    / \
//   D   E
// ```
// - Save D in a separated variable and put B in its place.
// ```
//        C       D           
//      /   \
//     A     B
//    / \
//   B   E
// ```
// - Replace the old B for the E node.
// ```
//        C       D           
//      /   \
//     A     E
//    / \
//   B   E
// ```
// - And then the old E by the D.
// ```
//        C    
//      /   \
//     A     E
//    / \
//   B   D
// ```

/**
 * Apply LL rotation in the tree
 */
Avl.prototype.rotateLL = function(){
  var ll;
  var oldLeft = this.left;
  var value = this.value;
  this.left = this.right;
  this.right = oldLeft;
  this.value = this.left.value;
  this.left.value = value;
  ll = this.left.left;
  this.left.left = this.right;
  this.right = this.left.right;
  this.left.right = ll;
};

// Apply the same rules of LL rotation but inverted
/**
 * Apply RR rotation in the tree
 */
Avl.prototype.rotateRR = function(){
  var rr;
  var oldRight = this.right;
  var value = this.value;
  this.right = this.left;
  this.left = oldRight;
  this.value = this.right.value;
  this.right.value = value;
  rr = this.right.right;
  this.right.right = this.left;
  this.left = this.right.left;
  this.right.left = rr;
};

/**
 * Insert a new value in the tree and balance it.
 *
 * @param {Integer} value
 * @return {Node} Return the created node or the node with the same value
 */
Avl.prototype.insert = function(value){
  var node = this;
  var stack = [];
  var insertInRight, addedNode; // true for right insertio, false for left
  // Navigate the tree until find the right place to insert the number
  while(node && node.value){
    stack.push(node);
    if(value > node.value){
      insertInRight = true;
      node = node.right;
    }else if(value < node.value){
      insertInRight = false;
      node = node.left;
    }else{
      return node;
    }
  } 

  // In case of a empty sub-tree the node is defined, so just define the value.
  if(node){
    node.value = value;
    return node;
  }

  // Pop the last lode from the stack
  node = stack.pop();

  // Insert in the defined position
  if(insertInRight){
    node.right = new Avl(value);
    addedNode = node.right;
  }else{
    node.left = new Avl(value);
    addedNode = node.left;
  }

  while(node){
    node.getDepthFromChilds();
    node.balance();
    node = stack.pop();
  }

  return addedNode;
};

Avl.prototype.balance = function(){
  var lHeight = !!this.left ? this.left.height : -1;  
  var rHeight = !!this.right ? this.right.height : -1;  
  if(lHeight > rHeight + 1){
    var llHeight = !!this.left.left ? this.left.left.height : -1;  
    var lrHeight = !!this.left.right ? this.left.right.height : -1;  
    if(lrHeight > llHeight){
      this.left.rotateLL();
    }
    this.rotateRR();
  }else if(rHeight > lHeight + 1){
    var rlHeight = !!this.right.left ? this.right.left.height : -1;  
    var rrHeight = !!this.right.right ? this.right.right.height : -1;  
    if(rlHeight > rrHeight){
      this.right.rotateRR();
    }
    this.rotateLL();
  }
};

module.exports = {
  Avl: Avl
};
