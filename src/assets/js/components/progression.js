var progression = {
    init: function init(){
        const fill = document.getElementById('fill');
        const pct = document.getElementById('pct');
        const bar = document.getElementById('bar');
        const buttons = document.querySelectorAll('.button');
        
        buttons.forEach(btn => {
            btn.setAttribute('aria-pressed', 'false');
            btn.addEventListener('click', () => {
                const v = btn.dataset.value;
                fill.style.width = v + '%';
                pct.textContent = v + '%';
                bar.setAttribute('aria-valuenow', v);
                buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
            });
        });
    }
}