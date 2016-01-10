/**
 * Created by DenQ on 31.08.2015.
 */
var _ = require('lodash');
var LTT, list, ltt;

LTT = (function() {
    LTT.prototype.groupParent = [];

    LTT.prototype.key_id = 'id';

    LTT.prototype.key_parent = 'parent';

    LTT.prototype.key_child = 'child';

    LTT.prototype.options = {};

    function LTT(list, options) {
        this.list = list;
        this.options = options != null ? options : {};
        this.ParseOptions();
        this.list = _.map(_.sortByOrder(this.list, [this.key_parent, this.key_id], ['asc', 'asc']));
        this.groupParent = _.uniq(_.pluck(this.list, this.key_parent));
        return this;
    }

    LTT.prototype.ParseOptions = function() {
        if (this.options.key_id != null) {
            this.key_id = this.options.key_id;
        }
        if (this.options.key_parent != null) {
            this.key_parent = this.options.key_parent;
        }
        if (this.options.key_child != null) {
            this.key_child = this.options.key_child;
        }
    };

    LTT.prototype.GetParentItems = function(parent) {
        var item, result, _i, _len, _ref;
        result = [];
        _ref = this.list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            if (item[this.key_parent] === parent) {
                result.push(item);
            }
        }
        return result;
    };

    LTT.prototype.GetItemById = function(id) {
        var item, _i, _len, _ref;
        _ref = this.list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            if (item[this.key_id] === id) {
                return item;
            }
        }
        return false;
    };

    LTT.prototype.GetTree = function() {
        var child, i, obj, parentId, result, _i, _j, _len, _len1, _ref;
        result = [];
        _ref = this.groupParent;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            parentId = _ref[_i];
            obj = this.GetItemById(parentId);
            child = this.GetParentItems(parentId);
            if (obj === false) {
                for (_j = 0, _len1 = child.length; _j < _len1; _j++) {
                    i = child[_j];
                    result.push(i);
                }
            } else {
                obj[this.key_child] = child;
            }
        }
        return result;
    };

    return LTT;

})();

module.exports = LTT;