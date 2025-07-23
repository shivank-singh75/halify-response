(function (exports) {
    /**
     * Link to another hypermedia
     */
    function Link(rel, value) {
      if (!(this instanceof Link)) return new Link(rel, value);
      if (!rel) throw new Error('Required <link> attribute "rel"');
  
      this.rel = rel;
  
      if (typeof value === 'object') {
        if (!value.href) throw new Error('Required <link> attribute "href"');
        const expectedAttributes = ['rel', 'href', 'name', 'hreflang', 'title', 'templated', 'icon', 'align', 'method'];
  
        for (const attr in value) {
          if (value.hasOwnProperty(attr) && expectedAttributes.includes(attr)) {
            this[attr] = value[attr];
          }
        }
      } else {
        if (!value) throw new Error('Required <link> attribute "href"');
        this.href = String(value);
      }
    }
  
    Link.prototype.toXML = function () {
      let xml = '<link';
      for (const attr in this) {
        if (this.hasOwnProperty(attr)) {
          xml += ` ${attr}="${escapeXml(this[attr])}"`;
        }
      }
      xml += ' />';
      return xml;
    };
  
    Link.prototype.toJSON = function () {
      return Object.keys(this).reduce((obj, key) => {
        obj[key] = this[key];
        return obj;
      }, {});
    };
  
    /**
     * A hypertext resource
     */
    function Resource(object, uri) {
      if (object instanceof Resource) return object;
      if (!(this instanceof Resource)) return new Resource(object, uri);
  
      this._links = {};
      this._embedded = {};
  
      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          this[property] = object[property];
        }
      }
  
      uri = uri || this.href;
      if (uri === this.href) delete this.href;
      if (uri) this.link(new Link('self', uri));
    }
  
    Resource.prototype.link = function (link) {
      if (arguments.length > 1) {
        link = Link(arguments[0], arguments[1]);
      }
  
      if (typeof this._links[link.rel] === 'undefined') {
        this._links[link.rel] = link;
      } else if (Array.isArray(this._links[link.rel])) {
        this._links[link.rel].push(link);
      } else {
        this._links[link.rel] = [this._links[link.rel], link];
      }
  
      return this;
    };
  
    Resource.prototype.embed = function (rel, resource, pluralize = true) {
      if (pluralize && !rel.endsWith('s')) {
        rel += 's';
      }
  
      if (!this._embedded[rel]) {
        this._embedded[rel] = [];
      } else if (!Array.isArray(this._embedded[rel])) {
        this._embedded[rel] = [this._embedded[rel]];
      }
  
      if (Array.isArray(resource)) {
        this._embedded[rel] = this._embedded[rel].concat(resource.map(r => new Resource(r)));
      } else {
        this._embedded[rel] = Resource(resource);
      }
  
      return this;
    };
  
    function resourceToJsonObject(resource) {
      const result = {};
  
      for (const prop in resource) {
        if (prop === '_links') {
          if (Object.keys(resource._links).length > 0) {
            result._links = Object.keys(resource._links).reduce((links, rel) => {
              if (Array.isArray(resource._links[rel])) {
                links[rel] = resource._links[rel].map(l => l.toJSON());
              } else {
                const link = resource._links[rel].toJSON();
                delete link.rel;
                links[rel] = link;
              }
              return links;
            }, {});
          }
        } else if (prop === '_embedded') {
          if (Object.keys(resource._embedded).length > 0) {
            result._embedded = {};
            for (const rel in resource._embedded) {
              result._embedded[rel] = resource._embedded[rel].map(resourceToJsonObject);
            }
          }
        } else if (resource.hasOwnProperty(prop)) {
          result[prop] = resource[prop];
        }
      }
  
      return result;
    }
  
    Resource.prototype.toJSON = function () {
      return resourceToJsonObject(this);
    };
  
    function escapeXml(string) {
      return String(string)
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  
    function resourceToXml(resource, rel, currentIndent = '', nextIndent = '') {
      const LF = (currentIndent || nextIndent) ? '\n' : '';
      let xml = `${currentIndent}<resource`;
  
      if (rel) xml += ` rel="${escapeXml(rel)}"`;
      const href = resource.href || (resource._links.self && resource._links.self.href);
      if (href) xml += ` href="${escapeXml(href)}"`;
      if (resource.name) xml += ` name="${escapeXml(resource.name)}"`;
      xml += `>${LF}`;
  
      for (const linkRel in resource._links) {
        if (!resource.href && linkRel === 'self') continue;
        xml += `${currentIndent + nextIndent}${resource._links[linkRel].toXML()}${LF}`;
      }
  
      for (const embed in resource._embedded) {
        const embeddedRel = embed.replace(/s$/, '');
        resource._embedded[embed].forEach(res => {
          xml += resourceToXml(
            res,
            embeddedRel,
            currentIndent + nextIndent,
            currentIndent + nextIndent + nextIndent
          ) + LF;
        });
      }
  
      for (const prop in resource) {
        if (resource.hasOwnProperty(prop) && prop !== '_links' && prop !== '_embedded') {
          xml += `${currentIndent + nextIndent}<${prop}>${String(resource[prop])}</${prop}>${LF}`;
        }
      }
  
      xml += `${currentIndent}</resource>`;
      return xml;
    }
  
    Resource.prototype.toXML = function (indent) {
      return resourceToXml(this, null, '', indent || '');
    };
  
    Resource.prototype.toString = function () {
      return JSON.stringify(this.toJSON(), null, 2);
    };
  
    exports.Resource = Resource;
    exports.Link = Link;
  
  })(typeof exports === 'undefined' ? (this['hal'] = {}) : exports);
  