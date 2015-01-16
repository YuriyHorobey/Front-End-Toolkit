describe(
    '$Parser: ',
    function () {
        var $p;

        var html = '<form>'
            + '<h2 data-marker="formTitle"></h2>'
            + '<input data-marker="userName" type="text">'
            + '<input type="submit" value="send" data-marker="submitButton">'
            + '</form>';

        beforeEach(function () {
            window.$ServiceProvider = {
                provide: function () {
                    return $;
                }
            };
            $p = new $Parser();
        });
        it('should create $markers field if one is omitted', function () {
            var view = {};

            $p.parse(html, view);
            expect(view.$markers).toBeDefined();
            expect(view.$markers).toEqual(jasmine.any(Object));

            view.$markers = null;
            $p.parse(html, view);
            expect(view.$markers).toBeDefined();
            expect(view.$markers).toEqual(jasmine.any(Object));

            view.$markers = 1;
            $p.parse(html, view);
            expect(view.$markers).toBeDefined();
            expect(view.$markers).toEqual(jasmine.any(Object));

            view.$markers = false;
            $p.parse(html, view);
            expect(view.$markers).toBeDefined();
            expect(view.$markers).toEqual(jasmine.any(Object));

            view.$markers = true;
            $p.parse(html, view);
            expect(view.$markers).toBeDefined();
            expect(view.$markers).toEqual(jasmine.any(Object));


        });
        it('should not create $markers field if one is present and is an object', function () {
            var view = {};
            view.$markers = {a: 1, b: 2};
            $p.parse(html, view);
            expect(Object.keys(view.$markers).length).toEqual(5);
            expect(view.$markers.a).toBe(1);
            expect(view.$markers.b).toBe(2);
        });
        it('should parse string', function () {
            var view = {};

            $p.parse(html, view);
            expect(view.$markers.userName).toBeDefined();
            expect(view.$markers.submitButton).toBeDefined();
        });
        it('should parse jQueryObject', function () {
            var view = {};
            $p.parse($(html), view);
            expect(view.$markers.userName).toBeDefined();
            expect(view.$markers.submitButton).toBeDefined();
        });

        it('should parse Document', function () {
            var fxt = jasmine.getFixtures();
            fxt.fixturesPath = 'base/';
            fxt.load('test/specs/$Parser/$Parser.html');
            var view = {};

            $p.parse(document, view);
            expect(view.$markers.myData).toBeDefined();
            expect(view.$markers.myData.attr('id')).toBe('my-data');

            expect(view.$markers.title).toBeDefined();
            expect(view.$markers.title.attr('id')).toBe('test-title');

            expect(Object.keys(view.$markers).length).toEqual(2);
            fxt.cleanUp();
            fxt.clearCache();
        });

        it('should parse separated DOM node', function () {
            var fxt = jasmine.getFixtures();
            fxt.fixturesPath = 'base/';
            fxt.load('test/specs/$Parser/$Parser.html');

            var node = document.getElementById('inner');

            var view = {};
            $p.parse(node, view);
            expect(Object.keys(view.$markers).length).toBe(1);
            expect(view.$markers.myData).toBeDefined();
            expect(view.$markers.myData.attr('id')).toBe('my-data');

            fxt.cleanUp();
            fxt.clearCache();
        });

        it('should use callback $takeMarker when available', function () {
            var view = {};
            view.$takeMarker = function (mName, mObj, midx) {

            };
            spyOn(view, '$takeMarker');
            $p.parse(html, view);
            expect(view.$takeMarker).toHaveBeenCalled();
        });
        it(
            'should use callback $takeMarker when available and respect the return value (true: stop processing; false/undefined:continue)',
            function () {
                var view = {};
                view.$takeMarker = function (mName, mObj, midx) {
                    if (midx == 0) {
                        return;
                    }
                    if (midx == 1) {
                        this.$markers[mName + midx] = mObj;
                        return true;
                    }
                    return false;
                };
                // spyOn(view, '$takeMarker');
                $p.parse(html, view);
                expect(view.$markers.userName).toBeUndefined();
                expect(view.$markers['userName1']).toBeDefined();
                expect(view.$markers.submitButton).toBeDefined();

            });
        it(
            'should throw exception if source is not a string, a DOM node or jQuery object',
            function () {
                expect(function () {
                    $p.parse(123, {});
                }).toThrow();
                expect(function () {
                    $p.parse({}, {});
                }).toThrow();
            });
        it(
            'should throw exception if view object is missing or not an object',
            function () {
                expect(function () {
                    $p.parse('');
                }).toThrow();
                expect(function () {
                    $p.parse('', null);
                }).toThrow();
                expect(function () {
                    $p.parse('', 1);
                }).toThrow();
                expect(function () {
                    $p.parse('', '');
                }).toThrow();
                expect(function () {
                    $p.parse('', 123);
                }).toThrow();
            });
    });