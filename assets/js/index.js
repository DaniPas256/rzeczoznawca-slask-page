(function () {
    var slider = {
        slides: 3,
        current_slide: 0,
        active_class: 'active-slide',
        animation_time: 3000,
        init: function constructor(htmlNode) {
            var imageHeight = htmlNode.dataset.height;
            this.slides = htmlNode.children.length;

            Array.from(htmlNode.children).forEach(function eachChildren(child, index) {
                if (index == this.current_slide) {
                    child.classList.add(this.active_class);
                    htmlNode.style.height = imageHeight || child.querySelector('img').height + 'px';
                }
            }.bind(this));

            setInterval(function changeSlide() {
                this.current_slide = (this.current_slide + 1) % this.slides;

                var activeSlide = document.querySelector('.' + this.active_class);
                var nextSlide = htmlNode.children[this.current_slide];

                activeSlide.classList.remove(this.active_class);
                nextSlide.classList.add(this.active_class);

                htmlNode.style.height = imageHeight || nextSlide.querySelector('img').height + 'px';
            }.bind(this), this.animation_time);
        }
    }

    var tab_list = {
        active_class: 'active',
        button_class: 'tab-list',
        content_class: 'tab-list-content',
        active_tab: 0,
        init: function constructor(buttonsNode, contentNode) {
            buttonsNode.children[this.active_tab].classList.add('active');
            contentNode.children[this.active_tab].classList.add('active');

            Array.from(buttonsNode.children).forEach(function eachChildren(child, index) {
                child.addEventListener('click', function clickTabTrigger() {
                    buttonsNode.children[this.active_tab].classList.remove('active');
                    contentNode.children[this.active_tab].classList.remove('active');

                    this.active_tab = child.dataset.id;

                    buttonsNode.children[this.active_tab].classList.add('active');
                    contentNode.children[this.active_tab].classList.add('active');
                }.bind(this))
            }.bind(this));
        }
    }

    if (document.querySelector('.docs-list')) {
        tab_list.init(document.querySelector('.docs-list'), document.querySelector('.docs-list-content'))
    }

    if (document.querySelector('.js-slider')) {
        slider.init(document.querySelector('.js-slider'));
    }


    $(document).on("submit", "form", function (e) {
        e.preventDefault();
        var data = $(this).serialize();

        $.ajax({
            url: "SendMail.php",
            type: "POST",
            data: data,
            success: function (result) {
                document.querySelector('form').reset();
                document.querySelector('.success-message').classList.add('active');
                setTimeout(function removeClassActive() {
                    document.querySelector('.success-message').classList.remove('active');
                }, 5000)
            }
        });
        return false;
    });

})();