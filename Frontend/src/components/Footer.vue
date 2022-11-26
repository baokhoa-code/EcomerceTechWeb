<template>
    <div class="footer">
        <div class="container">
            <footer class="py-5" style="padding-bottom: 1rem !important">
                <div class="row">
                    <div class="col-md-5 links footer_block">
                        <img src="../assets/logo-full.svg" height="100 px" width="200px" />
                        <br />

                        <p>
                            No. 1 of Gaming device in VietName, Gamers PCs & Pro Stations, accessories and components,
                            the cheapest prices
                        </p>
                    </div>

                    <div class="col">
                        <div class="col-md-5 links footer_block">
                            <br />
                            <p>
                                Telephone:

                                <br />(+84) 0372753988 <br />(+84) 0372753988
                            </p>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                    <p style="padding-left: 40%">&copy; Vuejs 3 project, 2022 - CTU.</p>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FooterView',
};
</script>
<style>
.footer {
    background: #f4f5f6;
}
.py-5 {
    padding-top: 4rem !important;
    padding-bottom: 0rem !important;
}
</style>
