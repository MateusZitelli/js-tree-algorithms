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
};
 
// *Applying the RR rotation to a tree reusing the nodes*
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
 * Apply RR rotation in the tree
 */
Avl.prototype.rotateRR = function(){
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

// Apply the same rules of RR rotation but inverted
/**
 * Apply LL rotation in the tree
 */
Avl.prototype.rotateLL = function(){
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
  var insertInRight; // true for right insertio, false for left
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
    return;
  }

  // Pop the last lode from the stack
  node = stack.pop();

  // Insert in the defined position
  if(insertInRight){
    node.right = new Avl(value);
    return node.right;
  }else{
    node.left = new Avl(value);
    return node.left
  }
};

module.exports = {
  Avl: Avl
};
