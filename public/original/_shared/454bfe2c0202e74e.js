
    (function () {
      'use strict';
      var markup = /<a\s+([^<>]*\bclass=["']cite-link["'][^<>]*)>([^<>]*)<\/a>|<(em|strong|code)>([^<>]*)<\/\3>|\*\*([^*\r\n]+)\*\*|`([^`\r\n]+)`|(?<![\w*])\*(\S(?:[^*\r\n]*?\S)?)\*(?![\w*])/gi;
      var skip = 'a, code, pre, script, style, textarea, template, [contenteditable]';

      function makeCitation(attributes, label) {
        var href = /(?:^|\s)href=(?:"([^"]+)"|'([^']+)')/i.exec(attributes);
        if (!href) return null;
        var url;
        try { url = new URL((href[1] || href[2]).replace(/&amp;/g, '&')); }
        catch (error) { return null; }
        if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
        var link = document.createElement('a');
        link.className = 'cite-link';
        link.href = url.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = label.replace(/&amp;/g, '&');
        return link;
      }

      function formatText(node) {
        var value = node.nodeValue;
        markup.lastIndex = 0;
        if (!markup.test(value) || !node.parentElement || node.parentElement.closest(skip)) return;
        markup.lastIndex = 0;
        var result = document.createDocumentFragment(), offset = 0, match;
        while ((match = markup.exec(value))) {
          var element = null;
          if (match[1]) {
            element = makeCitation(match[1], match[2]);
          } else if (match[6]) {
            element = document.createTextNode(match[6]);
          } else {
            element = document.createElement(match[3] ? match[3].toLowerCase() : match[7] ? 'em' : 'strong');
            element.textContent = match[4] || match[5] || match[7] || '';
          }
          if (!element) continue;
          result.append(value.slice(offset, match.index), element);
          offset = markup.lastIndex;
        }
        if (!offset) return;
        result.append(value.slice(offset));
        node.replaceWith(result);
      }

      function formatVisibleReportProse(root) {
        if (root.nodeType === Node.TEXT_NODE) { formatText(root); return; }
        if (root.nodeType !== Node.ELEMENT_NODE || root.closest(skip)) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        var pending = [], node;
        while ((node = walker.nextNode())) pending.push(node);
        pending.forEach(formatText);
      }

      document.addEventListener('DOMContentLoaded', function () {
        var main = document.querySelector('main');
        if (!main) return;
        formatVisibleReportProse(main);
        // Only inspect the nodes a report or language switch actually changes.
        new MutationObserver(function (changes) {
          changes.forEach(function (change) {
            if (change.type === 'characterData') formatText(change.target);
            else change.addedNodes.forEach(formatVisibleReportProse);
          });
        }).observe(main, {subtree:true, childList:true, characterData:true});
      });
    })();
  