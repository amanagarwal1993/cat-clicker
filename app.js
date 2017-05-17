$(function() {
    
    var model = {
        init: function() {
            localStorage.clear();
            localStorage.cats = JSON.stringify([
                    {
                        id: 'cat1',
                        name: 'Tom',
                        url: 'http://placekitten.com/601/350',
                        clicks: 0
                    },

                    {
                        id: 'cat2',
                        name: 'Jerry',
                        url: 'http://placekitten.com/602/350',
                        clicks: 0
                    },

                    {
                        id: 'cat3',
                        name: 'Rally',
                        url: 'http://placekitten.com/603/350',
                        clicks: 0
                    },

                    {
                        id: 'cat4',
                        name: 'Lex',
                        url: 'http://placekitten.com/604/350',
                        clicks: 0
                    },

                    {
                        id: 'cat5',
                        name: 'Manoj',
                        url: 'http://placekitten.com/605/360',
                        clicks: 0
                    }
                ]);
            },

        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },

        getCat: function(cat_id) {
            var cats = JSON.parse(localStorage.cats);
            for (var k=0; k<cats.length; k++) {
                if (cats[k].id == cat_id) {
                    return cats[k];
                }
            };

            return {};
        },

        update: function(cat_id) {
            var cats = JSON.parse(localStorage.cats);
            for (var k=0; k<cats.length; k++) {
                if (cats[k].id == cat_id) {
                    cats[k].clicks += 1;
                    localStorage.cats = JSON.stringify(cats);
                    break;
                }
            };
        },
        
        updateCat: function(cat_id, newname, newurl, newclicks) {
            var cats = JSON.parse(localStorage.cats);
            for (var k=0; k<cats.length; k++) {
                if (cats[k].id == cat_id) {
                    cats[k].name = newname;
                    cats[k].url = newurl;
                    cats[k].clicks = newclicks;
                    localStorage.cats = JSON.stringify(cats);
                };
            };
            return;
        }
    }



    var view = {
        render_cats_list: function(cats) {
            
            $('#cats').empty();
            
            for(var i=0; i<cats.length; i++) {
                var cat = cats[i];
                var list = document.createElement('li');
                var lista = document.createElement('a');
                lista.textContent = cat.name;
                lista.href = '#'
                list.classList.add('cat');
                lista.classList.add(cat.id);
                list.append(lista);
                $('#cats').append(list);
            };
            return;
        },

        show_cat: function(cat) {
            $('#cat-name').text(cat.name);
            $('#image').attr('src', cat.url);
            $('#clicks').text(String(cat.clicks));
            $('#click-heading').text('Clicks:');
            $('.click-image').attr('id', cat.id);
            
            $('#edit-cat').attr('style', 'display: NONE');
            $('#edit-cat input[name="new-name"]').val(cat.name);
            $('#edit-cat input[name="new-url"]').val(cat.url);
            $('#edit-cat input[name="new-clicks"]').val(cat.clicks);
            
            return;
        }
    };

    
    
    var octopus = {
        
        init: function() {
            model.init();
            view.show_cat(model.getAllCats()[0]);
            view.render_cats_list(model.getAllCats());
            
            $('.cat a').click(function() {
                console.log('hiya');
                var cat_id = $(this).attr('class');
                var cat = model.getCat(cat_id);
                view.show_cat(cat);
            });
            
            $('#current-cat .click-image').click(function() {
                var cat_id = $(this).attr('id');
                var cat = model.getCat(cat_id);
                cat.clicks += 1;
                octopus.update_clicks(cat.id);
                view.show_cat(cat)
            });
            
            $('.admin').click(function() {
                $('#edit-cat').attr('style', 'display: block');
            });
            
            $('.submit').click(function() {
                var newname = $('input[name="new-name"]').val();
                var newurl = $('input[name="new-url"]').val();
                var newclicks = $('input[name="new-clicks"]').val();
                
                var cat_id = $('.click-image:first').attr('id');
                
                model.updateCat(cat_id=cat_id, newname=newname, newurl=newurl, newclicks=newclicks);
                
                cat = model.getCat(cat_id);
                view.show_cat(cat);
                cats = model.getAllCats();
                view.render_cats_list(cats);
            });
            
            $('#cancel').click(function() {
                $(this).parent().attr('style', 'display: NONE');
            });
            
        },

        update_clicks: function(cat_id) {
            model.update(cat_id);
        }
    };

    octopus.init();

});




